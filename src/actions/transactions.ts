"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/validations";
import { requireSession } from "@/lib/session";
import type { FormState } from "@/actions/companies";

async function assertInvestmentIsOpen(investmentId: string) {
  const investment = await prisma.investment.findUniqueOrThrow({ where: { id: investmentId } });
  if (investment.status !== "OPEN") {
    throw new Error("Reopen this investment before editing its transactions");
  }
  return investment;
}

export async function createTransaction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const parsed = transactionSchema.safeParse({
    investmentId: formData.get("investmentId"),
    date: formData.get("date"),
    amount: formData.get("amount"),
    method: formData.get("method"),
    note: formData.get("note"),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  await assertInvestmentIsOpen(data.investmentId);

  await prisma.transaction.create({
    data: {
      investmentId: data.investmentId,
      date: new Date(data.date),
      amount: data.amount,
      method: data.method,
      note: data.note || null,
    },
  });

  revalidatePath(`/investments/${data.investmentId}`);
}

export async function updateTransaction(
  id: string,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireSession();

  const parsed = transactionSchema.safeParse({
    investmentId: formData.get("investmentId"),
    date: formData.get("date"),
    amount: formData.get("amount"),
    method: formData.get("method"),
    note: formData.get("note"),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  await assertInvestmentIsOpen(data.investmentId);

  await prisma.transaction.update({
    where: { id },
    data: {
      date: new Date(data.date),
      amount: data.amount,
      method: data.method,
      note: data.note || null,
    },
  });

  revalidatePath(`/investments/${data.investmentId}`);
}

export async function deleteTransaction(investmentId: string, id: string): Promise<void> {
  await requireSession();
  await assertInvestmentIsOpen(investmentId);
  await prisma.transaction.delete({ where: { id } });
  revalidatePath(`/investments/${investmentId}`);
}
