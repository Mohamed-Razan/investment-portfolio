"use client";

import { useMemo, useState } from "react";
import { formatCurrency, formatGrams } from "@/lib/format";
import type { MonthlyRow } from "@/lib/calculations";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type MonthlyUnit = { key: string; label: string; isGold: boolean; currency?: string };

export function MonthlyBreakdownTable({
  years,
  units,
  dataByYear,
}: {
  years: number[];
  units: MonthlyUnit[];
  dataByYear: Record<number, { byCurrency: Record<string, MonthlyRow[]>; gold: MonthlyRow[] }>;
}) {
  const [year, setYear] = useState(years[years.length - 1]);
  const [unitKey, setUnitKey] = useState(units[0]?.key);

  const unit = units.find((u) => u.key === unitKey) ?? units[0];
  const format = (n: number) => (unit?.isGold ? formatGrams(n) : formatCurrency(n, unit?.currency));

  const rows: MonthlyRow[] = useMemo(() => {
    const yearData = dataByYear[year];
    if (!yearData || !unit) return [];
    const allRows = unit.isGold ? yearData.gold : yearData.byCurrency[unit.key] ?? [];
    const now = new Date();
    // Future months haven't happened yet, so there's nothing to report for them.
    if (year < now.getFullYear()) return allRows;
    if (year > now.getFullYear()) return [];
    return allRows.filter((row) => row.month <= now.getMonth());
  }, [dataByYear, year, unit]);

  if (units.length === 0) {
    return <p className="text-sm text-muted-foreground">No investments yet.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Year</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-md border bg-background px-2 py-1 text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        {units.length > 1 && (
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Unit</span>
            <select
              value={unitKey}
              onChange={(e) => setUnitKey(e.target.value)}
              className="rounded-md border bg-background px-2 py-1 text-sm"
            >
              {units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-left font-medium">Month</th>
              <th className="px-3 py-2 text-right font-medium">Active investment</th>
              <th className="px-3 py-2 text-right font-medium">Profit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-b last:border-0 odd:bg-muted/20">
                <td className="px-3 py-2">{MONTH_NAMES[row.month]}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.invested)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                  {format(row.profit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
