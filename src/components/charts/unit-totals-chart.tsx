"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency, formatGrams } from "@/lib/format";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export function UnitTotalsChart({
  isGold,
  currency,
  invested,
  profit,
  accruedProfitOpen,
}: {
  isGold: boolean;
  currency?: string;
  invested: number;
  profit: number;
  accruedProfitOpen: number;
}) {
  const format = (n: number) => (isGold ? formatGrams(n) : formatCurrency(n, currency));
  const data = [
    { name: "Invested", value: invested },
    { name: "Profit", value: profit + accruedProfitOpen },
  ];

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={format} width={64} />
          <Tooltip formatter={(value) => format(Number(value))} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
