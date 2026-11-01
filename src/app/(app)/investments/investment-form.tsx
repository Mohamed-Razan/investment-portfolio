"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/actions/companies";

type Company = { id: string; name: string };
type Investment = {
  id: string;
  companyId: string;
  codeName: string;
  type: "VARIABLE" | "FIXED";
  assetType: "CURRENCY" | "GOLD";
  currency: string;
  profitCurrency: string | null;
  fixedRatePerMonth: number | null;
  notes: string | null;
};

export function InvestmentForm({
  companies,
  investment,
  defaultCompanyId,
  action,
}: {
  companies: Company[];
  investment?: Investment;
  defaultCompanyId?: string;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, undefined);
  const [type, setType] = useState<"VARIABLE" | "FIXED">(investment?.type ?? "VARIABLE");
  const [assetType, setAssetType] = useState<"CURRENCY" | "GOLD">(investment?.assetType ?? "CURRENCY");
  const [profitCurrency, setProfitCurrency] = useState(investment?.profitCurrency ?? "");

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyId">Company</Label>
        <select
          id="companyId"
          name="companyId"
          required
          defaultValue={investment?.companyId ?? defaultCompanyId ?? ""}
          className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
        >
          <option value="" disabled>
            Select a company
          </option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {state?.fieldErrors?.companyId && (
          <p className="text-sm text-destructive">{state.fieldErrors.companyId[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="codeName">Code name</Label>
        <Input
          id="codeName"
          name="codeName"
          required
          defaultValue={investment?.codeName}
          placeholder="e.g. GGP001, VT021, AI001"
          className="uppercase"
        />
        {state?.fieldErrors?.codeName && (
          <p className="text-sm text-destructive">{state.fieldErrors.codeName[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Investment type</Label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as "VARIABLE" | "FIXED")}
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            <option value="VARIABLE">Variable profit</option>
            <option value="FIXED">Fixed profit (Wakala)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assetType">Asset</Label>
          <select
            id="assetType"
            name="assetType"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value as "CURRENCY" | "GOLD")}
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            <option value="CURRENCY">Currency</option>
            <option value="GOLD">Gold (24kt, grams)</option>
          </select>
        </div>
      </div>

      {assetType === "CURRENCY" ? (
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <select
            id="currency"
            name="currency"
            defaultValue={investment?.currency ?? "LKR"}
            className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            {["LKR", "USD", "EUR", "GBP", "AED", "SAR"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          <input type="hidden" name="currency" value={investment?.currency ?? "LKR"} />
          <div className="space-y-2">
            <Label htmlFor="profitCurrency">Profit paid in</Label>
            <select
              id="profitCurrency"
              name="profitCurrency"
              value={profitCurrency}
              onChange={(e) => setProfitCurrency(e.target.value)}
              className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              <option value="">Gold (grams)</option>
              {["LKR", "USD", "EUR", "GBP", "AED", "SAR"].map((c) => (
                <option key={c} value={c}>
                  {c} (cash)
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Choose a currency if profit is paid as money instead of more grams of gold.
            </p>
          </div>
        </>
      )}

      {type === "FIXED" && (
        <div className="space-y-2">
          <Label htmlFor="fixedRatePerMonth">Fixed rate per month (%, optional)</Label>
          <Input
            id="fixedRatePerMonth"
            name="fixedRatePerMonth"
            type="number"
            step="0.01"
            defaultValue={investment?.fixedRatePerMonth ?? ""}
            placeholder="e.g. 3.6"
          />
          <p className="text-xs text-muted-foreground">
            Just a reference rate shown on the investment - not used in any calculation. Leave it blank if
            your deal is a flat amount (e.g. {profitCurrency || "cash"} per month) rather than a percentage.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" defaultValue={investment?.notes ?? ""} rows={3} />
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : investment ? "Save changes" : "Add investment"}
      </Button>
    </form>
  );
}
