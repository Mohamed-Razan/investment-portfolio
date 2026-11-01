import { prisma } from "@/lib/prisma";
import { calculateCurrentlyInvested, calculateWeightedAverageMonthlyProfit, toNumber } from "@/lib/calculations";
import { CompanyDialog } from "./company-dialog";
import { CompaniesList } from "./companies-list";

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    include: { investments: { include: { transactions: true } } },
    orderBy: { name: "asc" },
  });

  const cards = companies.map((company) => {
    const open = company.investments.filter((i) => i.status === "OPEN").length;
    const closed = company.investments.filter((i) => i.status === "CLOSED").length;
    const totalProfit = company.investments.reduce((sum, i) => {
      if (i.status === "CLOSED") return sum + toNumber(i.profitAmount);
      // Open FIXED investments (e.g. Wakala) accrue profit via transactions before ever closing.
      if (i.type === "FIXED") {
        const accrued = i.transactions
          .map((t) => toNumber(t.amount))
          .filter((amount) => amount > 0)
          .reduce((total, amount) => total + amount, 0);
        return sum + accrued;
      }
      return sum;
    }, 0);

    const closedInvestments = company.investments.filter((i) => i.status === "CLOSED");
    const avgMonthlyProfitPercent = calculateWeightedAverageMonthlyProfit(closedInvestments);

    const investedByUnit = new Map<string, { isGold: boolean; currency?: string; invested: number }>();
    for (const i of company.investments) {
      const amounts = i.transactions.map((t) => toNumber(t.amount));
      const invested = calculateCurrentlyInvested(i.status, i.type, i.profitCurrency, amounts);
      if (invested <= 0) continue;
      const isGold = i.assetType === "GOLD";
      const key = isGold ? "GOLD" : i.currency;
      const existing = investedByUnit.get(key);
      if (existing) existing.invested += invested;
      else investedByUnit.set(key, { isGold, currency: isGold ? undefined : i.currency, invested });
    }

    return {
      id: company.id,
      name: company.name,
      notes: company.notes,
      open,
      closed,
      totalProfit,
      avgMonthlyProfitPercent,
      investedByUnit: [...investedByUnit.values()],
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Companies</h1>
          <p className="text-muted-foreground">People/companies you invest with</p>
        </div>
        <CompanyDialog />
      </div>

      <CompaniesList companies={cards} />
    </div>
  );
}

