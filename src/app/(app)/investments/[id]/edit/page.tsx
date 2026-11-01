import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toNumber } from "@/lib/calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvestmentForm } from "../../investment-form";
import { updateInvestment } from "@/actions/investments";
import { ReopenButton } from "../reopen-button";

export default async function EditInvestmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [investment, companies] = await Promise.all([
    prisma.investment.findUnique({ where: { id } }),
    prisma.company.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!investment) notFound();

  if (investment.status !== "OPEN") {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">{investment.codeName} is closed</h1>
        <p className="text-muted-foreground">Reopen this investment before you can edit it.</p>
        <ReopenButton investmentId={investment.id} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit {investment.codeName}</h1>
        <p className="text-muted-foreground">Update investment details</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Investment details</CardTitle>
        </CardHeader>
        <CardContent>
          <InvestmentForm
            companies={companies}
            investment={{
              ...investment,
              fixedRatePerMonth: investment.fixedRatePerMonth ? toNumber(investment.fixedRatePerMonth) : null,
            }}
            action={updateInvestment.bind(null, investment.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
