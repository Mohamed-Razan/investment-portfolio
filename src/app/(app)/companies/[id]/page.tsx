import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { aggregateInvestmentTotals, calculateCurrentlyInvested, toNumber } from "@/lib/calculations";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentsTable } from "@/components/investments-table";
import { UnitTotalsCard } from "@/components/unit-totals-card";
import { InvestedByInvestmentChart } from "@/components/charts/invested-by-investment-chart";
import { CompanyDialog } from "../company-dialog";
import { DeleteButton } from "@/components/delete-button";
import { deleteCompany } from "@/actions/companies";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      investments: {
        include: { transactions: true, company: true },
        orderBy: { codeName: "asc" },
      },
    },
  });

  if (!company) notFound();

  const { byCurrency, gold } = aggregateInvestmentTotals(company.investments);
  const hasTotals = byCurrency.size > 0 || gold.invested > 0 || gold.profit > 0 || gold.accruedProfitOpen > 0;

  const chartsByUnit = new Map<string, { isGold: boolean; currency?: string; rows: { name: string; invested: number }[] }>();
  for (const inv of company.investments) {
    const amounts = inv.transactions.map((t) => toNumber(t.amount));
    const invested = calculateCurrentlyInvested(inv.status, inv.type, inv.profitCurrency, amounts);
    if (invested <= 0) continue;
    const isGold = inv.assetType === "GOLD";
    const key = isGold ? "GOLD" : inv.currency;
    if (!chartsByUnit.has(key)) {
      chartsByUnit.set(key, { isGold, currency: isGold ? undefined : inv.currency, rows: [] });
    }
    chartsByUnit.get(key)!.rows.push({ name: inv.codeName, invested });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{company.name}</h1>
          {company.notes && <p className="text-muted-foreground">{company.notes}</p>}
        </div>
        <div className="flex gap-2">
          <CompanyDialog company={{ id: company.id, name: company.name, notes: company.notes }} />
          <DeleteButton
            action={deleteCompany.bind(null, company.id)}
            itemLabel={company.name}
            redirectTo="/companies"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Investments</h2>
        <Link href={`/investments/new?companyId=${company.id}`} className={buttonVariants({ size: "sm" })}>
          Add investment
        </Link>
      </div>

      <InvestmentsTable investments={company.investments} showCompany={false} />

      {hasTotals && (
        <Card>
          <CardHeader>
            <CardTitle>Active investment vs. profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...byCurrency.entries()].map(([currency, totals]) => (
                <UnitTotalsCard key={currency} label={currency} isGold={false} currency={currency} totals={totals} />
              ))}
              {(gold.invested > 0 || gold.profit > 0 || gold.accruedProfitOpen > 0) && (
                <UnitTotalsCard label="Gold (24kt)" isGold totals={gold} />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {chartsByUnit.size > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active investment by investment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[...chartsByUnit.entries()].map(([key, group]) => (
              <div key={key}>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  {group.isGold ? "Gold (24kt)" : group.currency}
                </p>
                <InvestedByInvestmentChart data={group.rows} isGold={group.isGold} currency={group.currency} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

