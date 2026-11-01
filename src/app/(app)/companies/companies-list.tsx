"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatGrams, formatPercent } from "@/lib/format";
import { CompanyDialog } from "./company-dialog";
import { DeleteButton } from "@/components/delete-button";
import { deleteCompany } from "@/actions/companies";

export type CompanyCardData = {
  id: string;
  name: string;
  notes: string | null;
  open: number;
  closed: number;
  totalProfit: number;
  avgMonthlyProfitPercent: number | null;
  investedByUnit: { isGold: boolean; currency?: string; invested: number }[];
};

export function CompaniesList({ companies }: { companies: CompanyCardData[] }) {
  const [search, setSearch] = useState("");
  const filtered = companies.filter((c) => c.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by company name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <Card key={company.id}>
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-start justify-between">
                <Link href={`/companies/${company.id}`} className="text-lg font-semibold hover:underline">
                  {company.name}
                </Link>
                <div className="flex gap-2">
                  <CompanyDialog company={{ id: company.id, name: company.name, notes: company.notes }} />
                  <DeleteButton action={deleteCompany.bind(null, company.id)} itemLabel={company.name} />
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                <Badge variant="outline">{company.open} open</Badge>
                <Badge variant="outline">{company.closed} closed</Badge>
              </div>
              {company.investedByUnit.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Active investment:{" "}
                  <span className="font-medium text-foreground">
                    {company.investedByUnit
                      .map((u) => (u.isGold ? formatGrams(u.invested) : formatCurrency(u.invested, u.currency)))
                      .join(", ")}
                  </span>
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Total profit realised:{" "}
                <span className="font-medium text-foreground">{company.totalProfit.toLocaleString()}</span>
              </p>
              {company.avgMonthlyProfitPercent !== null && (
                <p className="text-sm text-muted-foreground">
                  Avg. monthly profit:{" "}
                  <span className="font-medium text-foreground">{formatPercent(company.avgMonthlyProfitPercent)}</span>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {companies.length === 0 ? "No companies yet. Add your first one." : "No companies match your search."}
          </p>
        )}
      </div>
    </div>
  );
}
