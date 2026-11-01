"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency, formatGrams } from "@/lib/format";

export function InvestedByInvestmentChart({
  data,
  isGold,
  currency,
}: {
  data: { name: string; invested: number }[];
  isGold: boolean;
  currency?: string;
}) {
  const format = (n: number) => (isGold ? formatGrams(n) : formatCurrency(n, currency));
  const height = Math.max(160, data.length * 36);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={format} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={80} />
          <Tooltip formatter={(value) => format(Number(value))} />
          <Bar dataKey="invested" name="Active investment" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
