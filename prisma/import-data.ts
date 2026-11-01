import { PrismaClient } from "@prisma/client";
import { calculateVariableProfit } from "../src/lib/calculations";

const prisma = new PrismaClient();

type Method = "CASH" | "BANK" | "OTHER";

type Txn = { date: string; amount: number; method?: Method; note?: string };

type InvSpec = {
  codeName: string;
  type: "VARIABLE" | "FIXED";
  assetType?: "CURRENCY" | "GOLD";
  currency?: string;
  profitCurrency?: string;
  fixedRatePerMonth?: number;
  closed?: boolean;
  notes?: string;
  transactions: Txn[];
  // FIXED investments where profit is paid on top of principal that stays deployed
  // (e.g. Wakala) - profit is the raw sum of positive transactions, not netted
  // against principal, since no principal-repayment transaction exists.
  profitIsPureReturns?: boolean;
};

type CompanySpec = {
  name: string;
  notes?: string;
  investments: InvSpec[];
};

const companies: CompanySpec[] = [
  {
    name: "Fazmy Phone",
    investments: [
      {
        codeName: "FP001",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2022-02-01", amount: -500000 },
          { date: "2022-04-03", amount: -300000 },
          { date: "2022-03-31", amount: 40000 },
          { date: "2022-05-20", amount: 30000 },
          { date: "2022-07-08", amount: 20000 },
          { date: "2022-08-14", amount: 23000 },
          { date: "2022-08-14", amount: 800000 },
        ],
      },
    ],
  },
  {
    name: "Nasrina Spicy",
    investments: [
      {
        codeName: "NS001",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2022-08-31", amount: -1400000 },
          { date: "2022-10-20", amount: 43200 },
          { date: "2022-12-10", amount: 88000 },
          { date: "2023-02-05", amount: 400000 },
          { date: "2023-04-12", amount: 1000000 },
        ],
      },
    ],
  },
  {
    name: "Yoosuf Bags",
    investments: [
      {
        codeName: "VT001",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2023-10-17", amount: -100000 },
          { date: "2023-10-23", amount: -200000 },
          { date: "2024-01-09", amount: -500000 },
          { date: "2024-04-15", amount: 880000 },
        ],
      },
      {
        codeName: "VT002",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2024-04-15", amount: -880000 },
          { date: "2024-09-29", amount: -120000 },
          { date: "2025-09-07", amount: 100000 },
          { date: "2025-09-19", amount: 140000 },
          { date: "2025-10-04", amount: 100000 },
          { date: "2025-10-14", amount: 100000 },
          { date: "2025-11-01", amount: 150000 },
          { date: "2025-11-01", amount: 50000 },
          { date: "2025-11-04", amount: 50000 },
          { date: "2025-12-02", amount: 90000 },
          { date: "2026-02-17", amount: 290000 },
        ],
      },
      {
        codeName: "VT005",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2022-12-27", amount: -200000 },
          { date: "2023-01-28", amount: 180000 },
          { date: "2023-02-06", amount: 30000 },
        ],
      },
      {
        codeName: "VT006",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2023-02-28", amount: -180000 },
          { date: "2023-04-28", amount: 194000 },
        ],
      },
      {
        codeName: "VT007",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2023-05-24", amount: -200000 },
          { date: "2023-07-29", amount: 214000 },
        ],
      },
      {
        codeName: "VT008",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2023-06-09", amount: -165600 },
          { date: "2023-08-16", amount: 178000 },
        ],
      },
      {
        codeName: "VT009",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2023-08-16", amount: -278000 },
          { date: "2023-10-17", amount: 297500 },
        ],
      },
      {
        codeName: "VT010",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2024-11-26", amount: -200000 },
          { date: "2024-12-31", amount: 100000 },
          { date: "2025-01-05", amount: 50000 },
          { date: "2025-01-26", amount: 62000 },
        ],
      },
      {
        codeName: "VT011",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2024-12-04", amount: -200000 },
          { date: "2025-01-26", amount: 50000 },
          { date: "2025-02-02", amount: 100000 },
          { date: "2025-02-13", amount: 66000 },
        ],
      },
      {
        codeName: "VT012",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2024-12-29", amount: -183000 },
          { date: "2025-04-12", amount: 100000 },
          { date: "2025-04-15", amount: 97640 },
        ],
      },
      {
        codeName: "VT013",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-03-01", amount: -200000 },
          { date: "2025-05-04", amount: 150000 },
          { date: "2025-06-03", amount: 64000 },
        ],
      },
      {
        codeName: "VT014",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-03-13", amount: -200000 },
          { date: "2025-06-03", amount: 50000 },
          { date: "2025-06-19", amount: 84000 },
          { date: "2025-07-04", amount: 80000 },
        ],
      },
      {
        codeName: "VT015",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-03-20", amount: -200000 },
          { date: "2025-07-20", amount: 70000 },
          { date: "2025-07-31", amount: 120000 },
          { date: "2025-08-12", amount: 24000 },
        ],
      },
      {
        codeName: "VT016",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-04-15", amount: -200000 },
          { date: "2025-08-12", amount: 51000 },
          { date: "2025-08-19", amount: 50000 },
          { date: "2025-10-15", amount: 50000 },
          { date: "2025-10-22", amount: 69000 },
        ],
      },
      {
        codeName: "VT017",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-05-15", amount: -200000 },
          { date: "2025-12-15", amount: 90000, note: "Reinvested into VT024" },
          { date: "2025-12-25", amount: 50000, note: "Reinvested into VT025" },
          { date: "2026-01-15", amount: 80000, note: "Reinvested into VT026" },
        ],
      },
      {
        codeName: "VT018",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-06-17", amount: -149600 },
          { date: "2026-01-15", amount: 80000, note: "Reinvested into VT026" },
          { date: "2026-02-17", amount: 65000, method: "CASH" },
          { date: "2026-03-04", amount: 19500, method: "CASH" },
        ],
      },
      {
        codeName: "VT019",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-08-21", amount: -200000 },
          { date: "2026-03-04", amount: 81500, method: "CASH" },
          { date: "2026-03-26", amount: 138500, method: "CASH" },
        ],
      },
      {
        codeName: "VT020",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-09-07", amount: -100000 },
          { date: "2026-03-26", amount: 110000, method: "CASH" },
        ],
      },
      {
        codeName: "VT021",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-09-19", amount: -140000 },
          { date: "2026-03-26", amount: 500, method: "CASH" },
          { date: "2026-04-13", amount: 40000, method: "CASH" },
          { date: "2026-04-26", amount: 40000, method: "CASH" },
          { date: "2026-05-09", amount: 73500, method: "CASH" },
        ],
      },
      {
        codeName: "VT022",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-10-10", amount: -50000 },
          { date: "2026-05-09", amount: 55000, method: "CASH" },
        ],
      },
      {
        codeName: "VT023",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-10-22", amount: -69000 },
          { date: "2026-05-09", amount: 75900, method: "CASH" },
        ],
      },
      {
        codeName: "VT024",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-12-15", amount: -90000 },
          { date: "2026-05-09", amount: 45600, method: "CASH" },
          { date: "2026-05-14", amount: 53400, method: "CASH" },
        ],
      },
      {
        codeName: "VT025",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2025-12-25", amount: -50000 },
          { date: "2026-05-14", amount: 55000, method: "CASH" },
        ],
      },
      {
        codeName: "VT026",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-01-15", amount: -160000 },
          { date: "2026-05-14", amount: 176000, method: "CASH" },
        ],
      },
    ],
  },
  {
    name: "Hostingate",
    investments: [
      {
        codeName: "HOST001",
        type: "FIXED",
        fixedRatePerMonth: 3.6,
        closed: true,
        profitIsPureReturns: true,
        transactions: [
          { date: "2025-05-05", amount: -500000 },
          { date: "2025-06-07", amount: 18000 },
          { date: "2025-07-14", amount: 18000 },
          { date: "2025-08-18", amount: 18000 },
        ],
      },
    ],
  },
  {
    name: "Huzni Land",
    investments: [
      { codeName: "HUZ001", type: "VARIABLE", transactions: [{ date: "2025-10-11", amount: -1700000 }] },
      { codeName: "HUZ002", type: "VARIABLE", transactions: [{ date: "2025-10-13", amount: -1000000 }] },
      { codeName: "HUZ003", type: "VARIABLE", transactions: [{ date: "2025-10-14", amount: -1500000 }] },
    ],
  },
  {
    name: "Anfas Textile",
    notes: "Textile",
    investments: [
      {
        codeName: "GGP001",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-01-04", amount: -1000000 },
          { date: "2026-03-04", amount: 500000 },
          { date: "2026-03-18", amount: 500000 },
          { date: "2026-04-15", amount: 84600 },
        ],
      },
      {
        codeName: "GGP002",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-02-14", amount: -1000000 },
          { date: "2026-05-18", amount: 500000 },
          { date: "2026-05-21", amount: 500000 },
        ],
      },
      {
        codeName: "GGP003",
        type: "VARIABLE",
        transactions: [
          { date: "2026-03-04", amount: -1000000 },
          { date: "2026-07-01", amount: 500000 },
        ],
      },
      {
        codeName: "GGP004",
        type: "VARIABLE",
        transactions: [
          { date: "2026-05-21", amount: -650000 },
          { date: "2026-05-22", amount: -350000 },
          { date: "2026-09-14", amount: 350000 },
        ],
      },
    ],
  },
  {
    name: "Anfas Chocolate",
    notes: "Chocolate",
    investments: [
      {
        codeName: "CHOC001",
        type: "VARIABLE",
        transactions: [
          { date: "2026-07-11", amount: -934713 },
          { date: "2026-08-10", amount: -684250, note: "for clearance" },
          { date: "2026-08-15", amount: 176640 },
          { date: "2026-08-17", amount: 500000 },
          { date: "2026-08-24", amount: 165000 },
          { date: "2026-09-01", amount: 259390 },
          { date: "2026-09-05", amount: 65000 },
          { date: "2026-09-09", amount: 140000 },
          { date: "2026-09-09", amount: 52800 },
          { date: "2026-09-11", amount: 60000 },
        ],
      },
      {
        codeName: "CHOC002",
        type: "VARIABLE",
        transactions: [
          { date: "2026-09-14", amount: -550000 },
          { date: "2026-09-16", amount: -531940 },
        ],
      },
    ],
  },
  {
    name: "Arshad Spicy",
    investments: [
      {
        codeName: "AI001",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-07-27", amount: -1000000 },
          { date: "2026-08-04", amount: 1012000 },
        ],
      },
      {
        codeName: "AI002",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-08-04", amount: -1000000 },
          { date: "2026-09-12", amount: 1016500 },
        ],
      },
      {
        codeName: "AI003",
        type: "VARIABLE",
        closed: true,
        transactions: [
          { date: "2026-08-15", amount: -1000000 },
          { date: "2026-09-12", amount: 1012000 },
        ],
      },
      {
        codeName: "AI004",
        type: "VARIABLE",
        transactions: [{ date: "2026-09-12", amount: -2000000 }],
      },
    ],
  },
  {
    name: "Alpha Jewellers",
    investments: [
      {
        codeName: "ALPHA001",
        type: "FIXED",
        assetType: "GOLD",
        profitCurrency: "LKR",
        notes: "4000 LKR per 8g valuation",
        transactions: [
          { date: "2026-08-10", amount: -120, method: "OTHER" },
          { date: "2026-09-19", amount: 60000 },
        ],
      },
      {
        codeName: "ALPHA002",
        type: "FIXED",
        fixedRatePerMonth: 1.5,
        transactions: [
          { date: "2026-08-10", amount: -3000000 },
          { date: "2026-09-19", amount: 45000 },
        ],
      },
    ],
  },
  {
    name: "LOLC",
    notes: "Fixed deposit (Wakala)",
    investments: [
      {
        codeName: "LOLC001",
        type: "FIXED",
        fixedRatePerMonth: 13 / 12,
        notes: "2-year term, matures 10.04.2028",
        transactions: [{ date: "2026-04-10", amount: -2000000 }],
      },
    ],
  },
];

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.company.deleteMany();

  for (const c of companies) {
    const company = await prisma.company.create({ data: { name: c.name, notes: c.notes ?? null } });

    for (const inv of c.investments) {
      const sortedDates = [...inv.transactions].map((t) => t.date).sort();
      const openedAt = new Date(sortedDates[0]);

      const created = await prisma.investment.create({
        data: {
          companyId: company.id,
          codeName: inv.codeName,
          type: inv.type,
          assetType: inv.assetType ?? "CURRENCY",
          currency: inv.currency ?? "LKR",
          profitCurrency: inv.profitCurrency ?? null,
          fixedRatePerMonth: inv.fixedRatePerMonth ?? null,
          notes: inv.notes ?? null,
          openedAt,
        },
      });

      await prisma.transaction.createMany({
        data: inv.transactions.map((t) => ({
          investmentId: created.id,
          date: new Date(t.date),
          amount: t.amount,
          method: t.method ?? "BANK",
          note: t.note ?? null,
        })),
      });

      if (inv.closed) {
        const ledger = inv.transactions.map((t) => ({ date: new Date(t.date), amount: t.amount }));
        const closedAt = new Date([...inv.transactions].map((t) => t.date).sort().at(-1)!);
        const mixedUnits = !!inv.profitCurrency;
        const calc = calculateVariableProfit(ledger, closedAt, { mixedUnits });

        const profitAmount = inv.profitIsPureReturns ? calc.totalReturned : calc.profitAmount;
        const monthlyProfitPercent = inv.type === "FIXED" ? inv.fixedRatePerMonth ?? 0 : calc.monthlyProfitPercent;

        await prisma.investment.update({
          where: { id: created.id },
          data: {
            status: "CLOSED",
            closedAt,
            totalPrincipal: calc.totalPrincipal,
            totalReturned: calc.totalReturned,
            profitAmount,
            durationMonths: calc.durationMonths,
            monthlyProfitPercent,
          },
        });
      }
    }
    console.log(`Loaded ${c.name}: ${c.investments.length} investment(s)`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
