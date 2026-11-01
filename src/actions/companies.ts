"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { companySchema } from "@/lib/validations";
import { requireSession } from "@/lib/session";

export type FormState =
  | { error?: string; fieldErrors?: Record<string, string[]> }
  | undefined;

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function createCompany(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const parsed = companySchema.safeParse({
    name: formData.get("name"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.company.create({
      data: { name: parsed.data.name, notes: parsed.data.notes || null },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "A company with this name already exists" };
    }
    throw error;
  }

  revalidatePath("/companies");
  redirect("/companies");
}

export async function updateCompany(
  id: string,
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  await requireSession();

  const parsed = companySchema.safeParse({
    name: formData.get("name"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.company.update({
      where: { id },
      data: { name: parsed.data.name, notes: parsed.data.notes || null },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "A company with this name already exists" };
    }
    throw error;
  }

  revalidatePath("/companies");
  revalidatePath(`/companies/${id}`);
  redirect("/companies");
}

export async function deleteCompany(id: string): Promise<void> {
  await requireSession();
  await prisma.company.delete({ where: { id } });
  revalidatePath("/companies");
}
