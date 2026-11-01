"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency, formatGrams } from "@/lib/format";

export function InvestedByCompanyChart({
  data,
  isGold,
  currency,
}: {
  data: { name: string; invested: number }[];
  isGold: boolean;
  currency?: string;
}) {
  const format = (n: number) => (isGold ? formatGrams(n) : formatCurrency(n, currency));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={format} width={72} />
          <Tooltip formatter={(value) => format(Number(value))} />
          <Bar dataKey="invested" name="Active investment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
