"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { closeInvestment } from "@/actions/investments";
import { toDateInputValue } from "@/lib/format";

export function CloseInvestmentDialog({ investmentId }: { investmentId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Close investment</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close investment</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) =>
            startTransition(async () => {
              try {
                await closeInvestment(investmentId, formData);
                toast.success("Investment closed and profit calculated.");
                setOpen(false);
              } catch {
                toast.error("Failed to close investment.");
              }
            })
          }
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="closeDate">Close date</Label>
            <DateField id="closeDate" name="closeDate" required defaultValue={toDateInputValue(new Date())} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Closing..." : "Confirm close"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
