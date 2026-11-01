"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompanyForm } from "./company-form";
import { createCompany, updateCompany } from "@/actions/companies";

type Company = { id: string; name: string; notes: string | null };

export function CompanyDialog({ company }: { company?: Company }) {
  const [open, setOpen] = useState(false);

  const action = company ? updateCompany.bind(null, company.id) : createCompany;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant={company ? "outline" : "default"} size={company ? "sm" : "default"} />}
      >
        {company ? "Edit" : "Add company"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{company ? "Edit company" : "Add company"}</DialogTitle>
        </DialogHeader>
        <CompanyForm company={company} action={action} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
