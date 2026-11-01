import { z } from "zod";

export const companySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const investmentSchema = z.object({
  companyId: z.string().min(1, "Company is required"),
  codeName: z
    .string()
    .trim()
    .min(1, "Code name is required")
    .max(40)
    .transform((v) => v.toUpperCase()),
  type: z.enum(["VARIABLE", "FIXED"]),
  assetType: z.enum(["CURRENCY", "GOLD"]).default("CURRENCY"),
  currency: z.enum(["LKR", "USD", "EUR", "GBP", "AED", "SAR"]),
  // Only meaningful when assetType is GOLD - cash currency the profit is actually paid in
  profitCurrency: z.enum(["LKR", "USD", "EUR", "GBP", "AED", "SAR"]).optional().nullable(),
  fixedRatePerMonth: z.coerce.number().optional().nullable(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const transactionSchema = z.object({
  investmentId: z.string().min(1),
  date: z.string().min(1, "Date is required"),
  amount: z.coerce.number().refine((v) => v !== 0, "Amount cannot be zero"),
  method: z.enum(["CASH", "BANK", "OTHER"]),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
