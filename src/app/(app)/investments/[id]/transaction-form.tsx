"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateField } from "@/components/ui/date-field";
import type { FormState } from "@/actions/companies";
import { createTransaction } from "@/actions/transactions";

export function AddTransactionForm({
  investmentId,
  assetType,
  profitCurrency,
}: {
  investmentId: string;
  assetType: "CURRENCY" | "GOLD";
  profitCurrency?: string | null;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    createTransaction,
    undefined
  );
  const unit = assetType === "GOLD" ? "grams" : "currency";
  const label = profitCurrency ? `Amount (grams / ${profitCurrency})` : `Amount (${unit})`;
  const placeholder = profitCurrency
    ? "-8 (grams given) or 8000 (profit)"
    : assetType === "GOLD"
      ? "-120 or 55.5"
      : "-100000 or 1500";
  const helpText = profitCurrency
    ? `Use a negative amount in grams for gold given (principal). Use a positive amount in ${profitCurrency} for profit received.`
    : `Use a negative amount for ${assetType === "GOLD" ? "gold given" : "money invested"} (principal) and a positive amount for returns/profit received.`;

  return (
    <form action={formAction} className="grid grid-cols-1 gap-3 rounded-md border p-4 sm:grid-cols-5">
      <input type="hidden" name="investmentId" value={investmentId} />
      <div className="space-y-1">
        <Label htmlFor="date">Date</Label>
        <DateField id="date" name="date" required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="amount">{label}</Label>
        <Input id="amount" name="amount" type="number" step="0.01" required placeholder={placeholder} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="method">Method</Label>
        <select id="method" name="method" className="h-9 w-full rounded-md border bg-transparent px-3 text-sm">
          <option value="BANK">Bank</option>
          <option value="CASH">Cash</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div className="space-y-1 sm:col-span-1">
        <Label htmlFor="note">Note</Label>
        <Input id="note" name="note" placeholder="optional" />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Adding..." : "Add"}
        </Button>
      </div>
      {state?.error && <p className="col-span-full text-sm text-destructive">{state.error}</p>}
      {state?.fieldErrors?.amount && (
        <p className="col-span-full text-sm text-destructive">{state.fieldErrors.amount[0]}</p>
      )}
      <p className="col-span-full text-xs text-muted-foreground">{helpText}</p>
    </form>
  );
}
