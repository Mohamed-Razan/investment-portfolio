"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/actions/companies";

type Company = { id: string; name: string; notes: string | null };

export function CompanyForm({
  company,
  action,
  onSuccess,
}: {
  company?: Company;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  onSuccess?: () => void;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form
      action={(formData) => {
        formAction(formData);
        onSuccess?.();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Company name</Label>
        <Input id="name" name="name" defaultValue={company?.name} required placeholder="e.g. Anfas" />
        {state?.fieldErrors?.name && (
          <p className="text-sm text-destructive">{state.fieldErrors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" name="notes" defaultValue={company?.notes ?? ""} rows={3} />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : company ? "Save changes" : "Add company"}
      </Button>
    </form>
  );
}
