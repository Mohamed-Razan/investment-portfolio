import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvestmentsTable } from "@/components/investments-table";

export default async function InvestmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string; assetType?: string; companyId?: string }>;
}) {
  const { q, status, type, assetType, companyId } = await searchParams;

  const where: Prisma.InvestmentWhereInput = {
    ...(status ? { status: status as "OPEN" | "CLOSED" } : {}),
    ...(type ? { type: type as "VARIABLE" | "FIXED" } : {}),
    ...(assetType ? { assetType: assetType as "CURRENCY" | "GOLD" } : {}),
    ...(companyId ? { companyId } : {}),
    ...(q
      ? {
          OR: [
            { codeName: { contains: q, mode: "insensitive" } },
            { company: { name: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [investments, companies] = await Promise.all([
    prisma.investment.findMany({
      where,
      include: { transactions: true, company: true },
      orderBy: { codeName: "asc" },
    }),
    prisma.company.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Investments</h1>
          <p className="text-muted-foreground">All investments across every company</p>
        </div>
        <Link href="/investments/new" className={buttonVariants()}>
          Add investment
        </Link>
      </div>

      <form className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">Search</label>
            <Input name="q" placeholder="Code name or company..." defaultValue={q} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <select
              name="status"
              defaultValue={status ?? ""}
              className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              <option value="">All</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <select
              name="type"
              defaultValue={type ?? ""}
              className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              <option value="">All</option>
              <option value="VARIABLE">Variable</option>
              <option value="FIXED">Fixed</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Asset</label>
            <select
              name="assetType"
              defaultValue={assetType ?? ""}
              className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              <option value="">All</option>
              <option value="CURRENCY">Currency</option>
              <option value="GOLD">Gold</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Company</label>
            <select
              name="companyId"
              defaultValue={companyId ?? ""}
              className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
            >
              <option value="">All</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t pt-4">
          <Link href="/investments" className={buttonVariants({ variant: "outline" })}>
            Clear
          </Link>
          <Button type="submit">Filter</Button>
        </div>
      </form>

      <InvestmentsTable investments={investments} />
    </div>
  );
}
