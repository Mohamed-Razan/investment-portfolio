"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { reopenInvestment } from "@/actions/investments";

export function ReopenButton({ investmentId }: { investmentId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          try {
            await reopenInvestment(investmentId);
            toast.success("Investment reopened. You can now edit it.");
          } catch {
            toast.error("Failed to reopen investment.");
          }
        })
      }
    >
      {isPending ? "Reopening..." : "Reopen to edit"}
    </Button>
  );
}
