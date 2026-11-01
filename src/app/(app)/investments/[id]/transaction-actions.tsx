"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateField } from "@/components/ui/date-field";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTransaction, deleteTransaction } from "@/actions/transactions";
import { DeleteButton } from "@/components/delete-button";
import type { FormState } from "@/actions/companies";
import { toDateInputValue } from "@/lib/format";

type Transaction = {
  id: string;
  investmentId: string;
  date: Date;
  amount: number;
  method: "CASH" | "BANK" | "OTHER";
  note: string | null;
};

export function TransactionRowActions({ transaction }: { transaction: Transaction }) {
  const [open, setOpen] = useState(false);
  const action = updateTransaction.bind(null, transaction.id);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <div className="flex justify-end gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" size="sm" />}>Edit</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit transaction</DialogTitle>
          </DialogHeader>
          <form
            action={(formData) => {
              formAction(formData);
              setOpen(false);
            }}
            className="space-y-4"
          >
            <input type="hidden" name="investmentId" value={transaction.investmentId} />
            <div className="space-y-2">
              <Label htmlFor={`date-${transaction.id}`}>Date</Label>
              <DateField
                id={`date-${transaction.id}`}
                name="date"
                required
                defaultValue={toDateInputValue(transaction.date)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`amount-${transaction.id}`}>Amount</Label>
              <Input
                id={`amount-${transaction.id}`}
                name="amount"
                type="number"
                step="0.01"
                required
                defaultValue={transaction.amount}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`method-${transaction.id}`}>Method</Label>
              <select
                id={`method-${transaction.id}`}
                name="method"
                defaultValue={transaction.method}
                className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              >
                <option value="BANK">Bank</option>
                <option value="CASH">Cash</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`note-${transaction.id}`}>Note</Label>
              <Input id={`note-${transaction.id}`} name="note" defaultValue={transaction.note ?? ""} />
            </div>
            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DeleteButton
        action={deleteTransaction.bind(null, transaction.investmentId, transaction.id)}
        itemLabel="this transaction"
      />
    </div>
  );
}
