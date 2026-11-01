import { formatCurrency, formatGrams } from "@/lib/format";
import type { UnitTotals } from "@/lib/calculations";
import { UnitTotalsChart } from "@/components/charts/unit-totals-chart";

export function UnitTotalsCard({
  label,
  isGold,
  currency,
  totals,
}: {
  label: string;
  isGold: boolean;
  currency?: string;
  totals: UnitTotals;
}) {
  const format = (n: number) => (isGold ? formatGrams(n) : formatCurrency(n, currency));
  const totalProfit = totals.profit + totals.accruedProfitOpen;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <p className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
      <UnitTotalsChart
        isGold={isGold}
        currency={currency}
        invested={totals.invested}
        profit={totals.profit}
        accruedProfitOpen={totals.accruedProfitOpen}
      />
      <dl className="mt-4 space-y-1.5 divide-y divide-border/60">
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <dt className="text-muted-foreground">Active investment</dt>
          <dd className="font-semibold tabular-nums">{format(totals.invested)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 pt-1.5 text-sm">
          <dt className="text-muted-foreground">Profit</dt>
          <dd className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
            {format(totalProfit)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
