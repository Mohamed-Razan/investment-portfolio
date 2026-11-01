import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/calculations";
import { formatDate, formatInvestmentAmount, formatProfitAmount, formatTransactionAmount, formatPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/delete-button";
import { deleteInvestment } from "@/actions/investments";
import { ReopenButton } from "./reopen-button";
import { CloseInvestmentDialog } from "./close-dialog";
import { AddTransactionForm } from "./transaction-form";
import { TransactionRowActions } from "./transaction-actions";

export default async function InvestmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investment = await prisma.investment.findUnique({
    where: { id },
    include: {
      company: true,
      transactions: { orderBy: { date: "asc" } },
    },
  });

  if (!investment) notFound();

  const isOpen = investment.status === "OPEN";
  const currentPrincipal = investment.transactions
    .filter((t) => toNumber(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(toNumber(t.amount)), 0);
  const currentReturned = investment.transactions
    .filter((t) => toNumber(t.amount) > 0)
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{investment.codeName}</h1>
            <Badge variant="outline">{investment.type}</Badge>
            {investment.assetType === "GOLD" && <Badge variant="outline">GOLD · 24kt</Badge>}
            <StatusBadge status={investment.status} />
          </div>
          <Link href={`/companies/${investment.company.id}`} className="text-muted-foreground hover:underline">
            {investment.company.name}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {isOpen ? (
            <>
              <Link href={`/investments/${investment.id}/edit`} className={buttonVariants({ variant: "outline" })}>
                Edit
              </Link>
              <CloseInvestmentDialog investmentId={investment.id} />
            </>
          ) : (
            <ReopenButton investmentId={investment.id} />
          )}
          <DeleteButton
            action={deleteInvestment.bind(null, investment.id)}
            itemLabel={investment.codeName}
            redirectTo={`/companies/${investment.company.id}`}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Principal</p>
            <p className="font-semibold">
              {formatInvestmentAmount(
                investment.status === "CLOSED" ? toNumber(investment.totalPrincipal) : currentPrincipal,
                investment
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Returned</p>
            <p className="font-semibold">
              {formatProfitAmount(
                investment.status === "CLOSED" ? toNumber(investment.totalReturned) : currentReturned,
                investment
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {investment.status === "OPEN" && investment.type === "FIXED" ? "Profit so far" : "Profit"}
            </p>
            <p className="font-semibold text-emerald-600">
              {investment.status === "CLOSED"
                ? formatProfitAmount(toNumber(investment.profitAmount), investment)
                : investment.type === "FIXED"
                  ? formatProfitAmount(currentReturned, investment)
                  : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly profit %</p>
            <p className="font-semibold">
              {investment.status === "CLOSED"
                ? formatPercent(toNumber(investment.monthlyProfitPercent))
                : investment.type === "FIXED"
                  ? formatPercent(toNumber(investment.fixedRatePerMonth))
                  : "—"}
            </p>
          </div>
          {investment.status === "CLOSED" && (
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold">{toNumber(investment.durationMonths).toFixed(2)} months</p>
            </div>
          )}
          {investment.closedAt && (
            <div>
              <p className="text-xs text-muted-foreground">Closed on</p>
              <p className="font-semibold">{formatDate(investment.closedAt)}</p>
            </div>
          )}
        </CardContent>
        {investment.notes && (
          <CardContent className="pt-0 text-sm text-muted-foreground">{investment.notes}</CardContent>
        )}
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Transactions</h2>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Note</TableHead>
                {isOpen && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {investment.transactions.map((t) => {
                const amount = toNumber(t.amount);
                return (
                  <TableRow key={t.id}>
                    <TableCell>{formatDate(t.date)}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${amount < 0 ? "text-destructive" : "text-emerald-600"}`}
                    >
                      {formatTransactionAmount(amount, investment)}
                    </TableCell>
                    <TableCell>{t.method}</TableCell>
                    <TableCell className="text-muted-foreground">{t.note}</TableCell>
                    {isOpen && (
                      <TableCell>
                        <TransactionRowActions transaction={{ ...t, amount }} />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {investment.transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isOpen ? 5 : 4} className="text-center text-muted-foreground">
                    No transactions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {isOpen && (
          <AddTransactionForm
            investmentId={investment.id}
            assetType={investment.assetType}
            profitCurrency={investment.profitCurrency}
          />
        )}
      </div>
    </div>
  );
}
