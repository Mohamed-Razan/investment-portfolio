import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { formatInvestmentAmount, formatProfitAmount, formatPercent } from "@/lib/format";
import { calculateCurrentlyInvested, toNumber } from "@/lib/calculations";

type InvestmentRow = {
  id: string;
  codeName: string;
  type: "VARIABLE" | "FIXED";
  status: "OPEN" | "CLOSED";
  assetType: "CURRENCY" | "GOLD";
  currency: string;
  profitCurrency: string | null;
  fixedRatePerMonth: unknown;
  totalPrincipal: unknown;
  profitAmount: unknown;
  monthlyProfitPercent: unknown;
  company: { id: string; name: string };
  transactions: { amount: unknown }[];
};

export function InvestmentsTable({
  investments,
  showCompany = true,
}: {
  investments: InvestmentRow[];
  showCompany?: boolean;
}) {
  return (
    <div className="max-h-[32rem] overflow-y-auto overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead>Code</TableHead>
            {showCompany && <TableHead>Company</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Principal</TableHead>
            <TableHead className="text-right">Active investment</TableHead>
            <TableHead className="text-right">Profit</TableHead>
            <TableHead className="text-right">Monthly %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((inv) => {
            const currentPrincipal = inv.transactions
              .filter((t) => toNumber(t.amount) < 0)
              .reduce((sum, t) => sum + Math.abs(toNumber(t.amount)), 0);
            const currentReturned = inv.transactions
              .filter((t) => toNumber(t.amount) > 0)
              .reduce((sum, t) => sum + toNumber(t.amount), 0);
            const principal = inv.status === "CLOSED" ? toNumber(inv.totalPrincipal) : currentPrincipal;
            const currentlyInvested = calculateCurrentlyInvested(
              inv.status,
              inv.type,
              inv.profitCurrency,
              inv.transactions.map((t) => toNumber(t.amount))
            );
            const profit =
              inv.status === "CLOSED"
                ? toNumber(inv.profitAmount)
                : inv.type === "FIXED"
                  ? currentReturned
                  : null;
            const monthlyPercent =
              inv.status === "CLOSED"
                ? toNumber(inv.monthlyProfitPercent)
                : inv.type === "FIXED"
                  ? toNumber(inv.fixedRatePerMonth)
                  : null;

            return (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">
                  <Link href={`/investments/${inv.id}`} className="hover:underline">
                    {inv.codeName}
                  </Link>
                </TableCell>
                {showCompany && (
                  <TableCell>
                    <Link href={`/companies/${inv.company.id}`} className="hover:underline">
                      {inv.company.name}
                    </Link>
                  </TableCell>
                )}
                <TableCell>
                  <Badge variant="outline">{inv.type}</Badge>
                  {inv.assetType === "GOLD" && (
                    <Badge variant="outline" className="ml-1">
                      GOLD
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={inv.status} />
                </TableCell>
                <TableCell className="text-right">{formatInvestmentAmount(principal, inv)}</TableCell>
                <TableCell className="text-right">
                  {currentlyInvested > 0 ? (
                    <Badge
                      variant="outline"
                      className="border-emerald-600/20 bg-emerald-500/10 font-semibold text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400"
                    >
                      {formatInvestmentAmount(currentlyInvested, inv)}
                    </Badge>
                  ) : (
                    formatInvestmentAmount(currentlyInvested, inv)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {profit !== null ? formatProfitAmount(profit, inv) : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {monthlyPercent !== null ? formatPercent(monthlyPercent) : "—"}
                </TableCell>
              </TableRow>
            );
          })}
          {investments.length === 0 && (
            <TableRow>
              <TableCell colSpan={showCompany ? 8 : 7} className="text-center text-muted-foreground">
                No investments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
