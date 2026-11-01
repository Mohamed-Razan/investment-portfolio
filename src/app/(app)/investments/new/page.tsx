import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentForm } from "../investment-form";
import { createInvestment } from "@/actions/investments";

export default async function NewInvestmentPage({
  searchParams,
}: {
  searchParams: Promise<{ companyId?: string }>;
}) {
  const { companyId } = await searchParams;
  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add investment</h1>
        <p className="text-muted-foreground">Create a new investment under a company</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Investment details</CardTitle>
        </CardHeader>
        <CardContent>
          <InvestmentForm companies={companies} defaultCompanyId={companyId} action={createInvestment} />
        </CardContent>
      </Card>
    </div>
  );
}
