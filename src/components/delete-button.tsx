"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteButton({
  action,
  itemLabel,
  size = "sm",
  redirectTo,
}: {
  action: () => Promise<void>;
  itemLabel: string;
  size?: "sm" | "default";
  redirectTo?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" size={size} />}>
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemLabel}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {itemLabel} and everything under it. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                try {
                  await action();
                  if (redirectTo) router.push(redirectTo);
                } catch {
                  toast.error("Failed to delete. Please try again.");
                }
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
