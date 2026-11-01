"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { investmentSchema } from "@/lib/validations";
import { requireSession } from "@/lib/session";
import { calculateVariableProfit, toNumber } from "@/lib/calculations";
import type { FormState } from "@/actions/companies";

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function parseInvestmentForm(formData: FormData) {
  return investmentSchema.safeParse({
    companyId: formData.get("companyId"),
    codeName: formData.get("codeName"),
    type: formData.get("type"),
    assetType: formData.get("assetType") || undefined,
    currency: formData.get("currency"),
    profitCurrency: formData.get("profitCurrency") || undefined,
    fixedRatePerMonth: formData.get("fixedRatePerMonth") || undefined,
    notes: formData.get("notes"),
  });
}

export async function createInvestment(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const parsed = parseInvestmentForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  let created: { id: string };
  try {
    created = await prisma.investment.create({
      data: {
        companyId: data.companyId,
        codeName: data.codeName,
        type: data.type,
        assetType: data.assetType,
        currency: data.currency,
        profitCurrency: data.assetType === "GOLD" ? data.profitCurrency ?? null : null,
        fixedRatePerMonth: data.type === "FIXED" ? data.fixedRatePerMonth ?? null : null,
        notes: data.notes || null,
      },
      select: { id: true },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "An investment with this code name already exists" };
    }
    throw error;
  }

  revalidatePath("/investments");
  revalidatePath(`/companies/${data.companyId}`);
  redirect(`/investments/${created.id}`);
}

export async function updateInvestment(
  id: string,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireSession();

  const existing = await prisma.investment.findUniqueOrThrow({ where: { id } });
  if (existing.status !== "OPEN") {
    return { error: "Reopen this investment before editing it" };
  }

  const parsed = parseInvestmentForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  try {
    await prisma.investment.update({
      where: { id },
      data: {
        companyId: data.companyId,
        codeName: data.codeName,
        type: data.type,
        assetType: data.assetType,
        currency: data.currency,
        profitCurrency: data.assetType === "GOLD" ? data.profitCurrency ?? null : null,
        fixedRatePerMonth: data.type === "FIXED" ? data.fixedRatePerMonth ?? null : null,
        notes: data.notes || null,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "An investment with this code name already exists" };
    }
    throw error;
  }

  revalidatePath("/investments");
  revalidatePath(`/investments/${id}`);
  redirect(`/investments/${id}`);
}

export async function deleteInvestment(id: string): Promise<void> {
  await requireSession();
  const investment = await prisma.investment.delete({ where: { id } });
  revalidatePath("/investments");
  revalidatePath(`/companies/${investment.companyId}`);
}

export async function closeInvestment(id: string, formData: FormData): Promise<void> {
  await requireSession();

  const investment = await prisma.investment.findUniqueOrThrow({
    where: { id },
    include: { transactions: true },
  });
  if (investment.status !== "OPEN") {
    throw new Error("Investment must be open to close");
  }

  const closeDateRaw = formData.get("closeDate");
  const closedAt = closeDateRaw ? new Date(closeDateRaw as string) : new Date();

  const ledger = investment.transactions.map((t) => ({ date: t.date, amount: toNumber(t.amount) }));
  const calc = calculateVariableProfit(ledger, closedAt, { mixedUnits: investment.profitCurrency !== null });

  const monthlyProfitPercent =
    investment.type === "FIXED" ? toNumber(investment.fixedRatePerMonth) : calc.monthlyProfitPercent;

  await prisma.investment.update({
    where: { id },
    data: {
      status: "CLOSED",
      closedAt,
      totalPrincipal: calc.totalPrincipal,
      totalReturned: calc.totalReturned,
      profitAmount: calc.profitAmount,
      durationMonths: calc.durationMonths,
      monthlyProfitPercent,
    },
  });

  revalidatePath("/investments");
  revalidatePath(`/investments/${id}`);
  revalidatePath(`/companies/${investment.companyId}`);
}

export async function reopenInvestment(id: string): Promise<void> {
  await requireSession();

  const investment = await prisma.investment.findUniqueOrThrow({ where: { id } });
  if (investment.status !== "CLOSED") {
    throw new Error("Investment must be closed to reopen");
  }

  await prisma.investment.update({
    where: { id },
    data: {
      status: "OPEN",
      closedAt: null,
      totalPrincipal: null,
      totalReturned: null,
      profitAmount: null,
      durationMonths: null,
      monthlyProfitPercent: null,
    },
  });

  revalidatePath("/investments");
  revalidatePath(`/investments/${id}`);
  revalidatePath(`/companies/${investment.companyId}`);
}
