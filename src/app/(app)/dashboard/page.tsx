import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { aggregateInvestmentTotals, buildMonthlyBreakdown, calculateCurrentlyInvested, toNumber, GOLD_BUCKET_KEY } from "@/lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UnitTotalsCard } from "@/components/unit-totals-card";
import { MonthlyBreakdownTable, type MonthlyUnit } from "@/components/monthly-breakdown-table";
import { InvestedByCompanyChart } from "@/components/charts/invested-by-company-chart";

export default async function DashboardPage() {
  const [companies, investments] = await Promise.all([
    prisma.company.count(),
    prisma.investment.findMany({
      include: { transactions: true, company: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const openInvestments = investments.filter((i) => i.status === "OPEN");
  const closedInvestments = investments.filter((i) => i.status === "CLOSED");

  const { byCurrency, gold } = aggregateInvestmentTotals(investments);
  const hasGold = gold.invested > 0 || gold.profit > 0 || gold.accruedProfitOpen > 0;

  const units: MonthlyUnit[] = [
    ...[...byCurrency.keys()].map((currency) => ({ key: currency, label: currency, isGold: false, currency })),
    ...(hasGold ? [{ key: GOLD_BUCKET_KEY, label: "Gold (24kt)", isGold: true }] : []),
  ];

  const allDates = investments.flatMap((inv) => [
    ...(inv.closedAt ? [inv.closedAt] : []),
    ...inv.transactions.map((t) => t.date),
  ]);
  const currentYear = new Date().getFullYear();
  const minYear = allDates.length ? Math.min(currentYear, ...allDates.map((d) => d.getFullYear())) : currentYear;
  const maxYear = allDates.length ? Math.max(currentYear, ...allDates.map((d) => d.getFullYear())) : currentYear;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  const monthlyByYear = Object.fromEntries(
    years.map((year) => {
      const { byCurrency: monthlyByCurrency, gold: monthlyGold } = buildMonthlyBreakdown(investments, year);
      return [year, { byCurrency: Object.fromEntries(monthlyByCurrency), gold: monthlyGold }];
    })
  );

  const recentOpen = [...openInvestments].sort((a, b) => a.codeName.localeCompare(b.codeName));

  const companyTotalsLkr = new Map<string, number>();
  for (const inv of investments) {
    if (inv.assetType !== "CURRENCY" || inv.currency !== "LKR") continue;
    const amounts = inv.transactions.map((t) => toNumber(t.amount));
    const invested = calculateCurrentlyInvested(inv.status, inv.type, inv.profitCurrency, amounts);
    if (invested <= 0) continue;
    companyTotalsLkr.set(inv.company.name, (companyTotalsLkr.get(inv.company.name) ?? 0) + invested);
  }
  const byCompanyLkr = [...companyTotalsLkr.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, invested]) => ({ name, invested }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your investment portfolio</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Companies</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{companies}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{openInvestments.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Closed Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{closedInvestments.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Investments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{investments.length}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open investments</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOpen.length === 0 ? (
            <p className="text-sm text-muted-foreground">No open investments.</p>
          ) : (
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {recentOpen.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/investments/${inv.id}`}
                  className="flex items-center justify-between rounded-md border p-3 text-sm hover:bg-muted"
                >
                  <div>
                    <span className="font-medium">{inv.codeName}</span>
                    <span className="ml-2 text-muted-foreground">{inv.company.name}</span>
                  </div>
                  <Badge variant="outline">{inv.type}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active investment &amp; profit by month</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyBreakdownTable years={years} units={units} dataByYear={monthlyByYear} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active investment vs. profit, by currency &amp; metal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[...byCurrency.entries()].map(([currency, totals]) => (
              <UnitTotalsCard key={currency} label={currency} isGold={false} currency={currency} totals={totals} />
            ))}
            {hasGold && <UnitTotalsCard label="Gold (24kt)" isGold totals={gold} />}
            {units.length === 0 && <p className="text-sm text-muted-foreground">No investments yet.</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active investment by company (LKR)</CardTitle>
        </CardHeader>
        <CardContent>
          {byCompanyLkr.length === 0 ? (
            <p className="text-sm text-muted-foreground">No LKR investments yet.</p>
          ) : (
            <InvestedByCompanyChart data={byCompanyLkr} isGold={false} currency="LKR" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
