import { Decimal } from "@prisma/client/runtime/library";

const AVG_DAYS_PER_MONTH = 30.4375;

export type LedgerEntry = { date: Date; amount: number };

export type ProfitCalculation = {
  totalPrincipal: number;
  totalReturned: number;
  profitAmount: number;
  durationMonths: number;
  monthlyProfitPercent: number;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * How much principal is still tied up in an open investment right now.
 * Closed investments have nothing left invested. FIXED (Wakala) principal stays fully
 * deployed until closed - returns there are profit payments, not principal coming back
 * (same for cash profit on a non-currency principal, e.g. gold). VARIABLE returns pay the
 * principal down, so what's left is whatever hasn't come back yet (never below zero, i.e.
 * once returns overtake principal it's pure profit and nothing is "currently invested").
 */
export function calculateCurrentlyInvested(
  status: string,
  type: string,
  profitCurrency: string | null,
  amounts: number[]
): number {
  if (status === "CLOSED") return 0;
  const principal = amounts.filter((a) => a < 0).reduce((sum, a) => sum + Math.abs(a), 0);
  if (type === "FIXED" || profitCurrency) return principal;
  const returned = amounts.filter((a) => a > 0).reduce((sum, a) => sum + a, 0);
  return Math.max(principal - returned, 0);
}

export type UnitTotals = { invested: number; profit: number; accruedProfitOpen: number };

export const GOLD_BUCKET_KEY = "__GOLD__";

type InvestmentForAggregation = {
  status: string;
  type: string;
  assetType: string;
  currency: string;
  profitCurrency: string | null;
  profitAmount: unknown;
  transactions: { amount: unknown }[];
};

/**
 * Groups investments into totals per unit (each currency, plus one bucket for gold grams).
 * Profit is bucketed by `profitCurrency` when set (cash profit on a non-currency principal),
 * otherwise it shares the principal's own unit - same rule as `calculateCurrentlyInvested`.
 */
export function aggregateInvestmentTotals(
  investments: InvestmentForAggregation[]
): { byCurrency: Map<string, UnitTotals>; gold: UnitTotals } {
  const byCurrency = new Map<string, UnitTotals>();
  const gold: UnitTotals = { invested: 0, profit: 0, accruedProfitOpen: 0 };

  function getBucket(key: string): UnitTotals {
    if (key === GOLD_BUCKET_KEY) return gold;
    let entry = byCurrency.get(key);
    if (!entry) {
      entry = { invested: 0, profit: 0, accruedProfitOpen: 0 };
      byCurrency.set(key, entry);
    }
    return entry;
  }

  for (const inv of investments) {
    const principalKey = inv.assetType === "GOLD" ? GOLD_BUCKET_KEY : inv.currency;
    const principalEntry = getBucket(principalKey);
    const amounts = inv.transactions.map((t) => toNumber(t.amount));

    if (inv.status === "OPEN") {
      principalEntry.invested += calculateCurrentlyInvested(inv.status, inv.type, inv.profitCurrency, amounts);
    }

    const profitEntry = getBucket(inv.profitCurrency ?? principalKey);

    if (inv.status === "OPEN") {
      if (inv.type === "FIXED") {
        profitEntry.accruedProfitOpen += amounts.filter((a) => a > 0).reduce((sum, a) => sum + a, 0);
      }
    } else {
      profitEntry.profit += toNumber(inv.profitAmount);
    }
  }

  return { byCurrency, gold };
}

export type MonthlyRow = { month: number; invested: number; profit: number };

type InvestmentForMonthlyBreakdown = {
  type: string;
  assetType: string;
  currency: string;
  profitCurrency: string | null;
  profitAmount: unknown;
  closedAt: Date | null;
  transactions: { amount: unknown; date: Date }[];
};

function emptyMonthlyRows(): MonthlyRow[] {
  return Array.from({ length: 12 }, (_, month) => ({ month, invested: 0, profit: 0 }));
}

/**
 * Builds a month-by-month breakdown (Jan-Dec) of a given year, per unit (each currency,
 * plus one bucket for gold grams): how much was actively invested by the end of each
 * month, and how much profit landed in that specific month (closed investments count
 * their whole profit in the month they closed; open FIXED investments count whatever
 * cash profit transactions fall in that month).
 */
export function buildMonthlyBreakdown(
  investments: InvestmentForMonthlyBreakdown[],
  year: number
): { byCurrency: Map<string, MonthlyRow[]>; gold: MonthlyRow[] } {
  const byCurrency = new Map<string, MonthlyRow[]>();
  const gold: MonthlyRow[] = emptyMonthlyRows();

  function getRows(key: string): MonthlyRow[] {
    if (key === GOLD_BUCKET_KEY) return gold;
    let rows = byCurrency.get(key);
    if (!rows) {
      rows = emptyMonthlyRows();
      byCurrency.set(key, rows);
    }
    return rows;
  }

  for (const inv of investments) {
    const principalKey = inv.assetType === "GOLD" ? GOLD_BUCKET_KEY : inv.currency;
    const principalRows = getRows(principalKey);
    const profitRows = getRows(inv.profitCurrency ?? principalKey);

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
      const closedByMonthEnd = inv.closedAt !== null && inv.closedAt <= monthEnd;

      const amountsToDate = inv.transactions
        .filter((t) => t.date <= monthEnd)
        .map((t) => toNumber(t.amount));
      principalRows[month].invested += calculateCurrentlyInvested(
        closedByMonthEnd ? "CLOSED" : "OPEN",
        inv.type,
        inv.profitCurrency,
        amountsToDate
      );

      if (closedByMonthEnd && inv.closedAt! >= monthStart) {
        profitRows[month].profit += toNumber(inv.profitAmount);
      } else if (!closedByMonthEnd && inv.type === "FIXED") {
        profitRows[month].profit += inv.transactions
          .filter((t) => t.date >= monthStart && t.date <= monthEnd && toNumber(t.amount) > 0)
          .reduce((sum, t) => sum + toNumber(t.amount), 0);
      }
    }
  }

  return { byCurrency, gold };
}

/**
 * Computes profit stats for a VARIABLE investment from its transaction ledger
 * using the weighted average balance (dollar-days) method: every cash flow is
 * weighted by the number of days it stayed active, so mid-cycle top-ups or
 * partial returns don't distort the resulting monthly rate.
 * Negative amounts = principal invested, positive amounts = returns received.
 * Duration runs from the first transaction to the closing date.
 */
export function calculateVariableProfit(
  transactions: LedgerEntry[],
  closedAt: Date,
  options?: { mixedUnits?: boolean }
): ProfitCalculation {
  const principalEntries = transactions.filter((t) => t.amount < 0);
  const returnEntries = transactions.filter((t) => t.amount > 0);

  const totalPrincipal = principalEntries.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalReturned = returnEntries.reduce((sum, t) => sum + t.amount, 0);
  // When profit is paid in a different unit than the principal (e.g. cash profit on a
  // gold principal), the two aren't commensurate, so profit is just the cash received.
  const profitAmount = options?.mixedUnits ? totalReturned : totalReturned - totalPrincipal;

  const sorted = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());
  const firstDate = sorted.length ? sorted[0].date : closedAt;

  const durationDays = Math.max((closedAt.getTime() - firstDate.getTime()) / MS_PER_DAY, 1);
  const durationMonths = durationDays / AVG_DAYS_PER_MONTH;

  if (options?.mixedUnits) {
    // Balance-weighted exposure doesn't make sense across mismatched units, and FIXED
    // investments (the only case this applies to) already display their own agreed rate.
    return { totalPrincipal, totalReturned, profitAmount, durationMonths, monthlyProfitPercent: 0 };
  }

  // Walk the ledger, weighting the outstanding balance by the days it was held.
  let balance = 0;
  let exposure = 0;
  for (let i = 0; i < sorted.length; i++) {
    balance += -sorted[i].amount; // invest (negative amount) raises balance, returns lower it
    const segmentEnd = i + 1 < sorted.length ? sorted[i + 1].date : closedAt;
    const segmentDays = (segmentEnd.getTime() - sorted[i].date.getTime()) / MS_PER_DAY;
    exposure += balance * segmentDays;
  }

  const monthlyProfitPercent = exposure > 0 ? (profitAmount / exposure) * AVG_DAYS_PER_MONTH * 100 : 0;

  return {
    totalPrincipal,
    totalReturned,
    profitAmount,
    durationMonths,
    monthlyProfitPercent,
  };
}

export function toNumber(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (value instanceof Decimal) return value.toNumber();
  return Number(value);
}

type ClosedInvestmentForWeightedAverage = {
  status: string;
  profitCurrency: string | null;
  closedAt: Date | null;
  profitAmount: unknown;
  transactions: { date: Date; amount: unknown }[];
};

/**
 * Combines multiple closed investments into a single weighted-average monthly profit
 * rate: every investment's capital is weighted by its own dollar-days exposure, then
 * profit and exposure are summed across investments before dividing, so investments
 * with more capital or longer duration count proportionally more than a plain average
 * of each investment's own rate would. Mixed-unit investments (profit paid in a
 * different unit than the principal) are excluded since their exposure isn't
 * commensurate with same-unit investments.
 */
export function calculateWeightedAverageMonthlyProfit(
  investments: ClosedInvestmentForWeightedAverage[]
): number | null {
  let totalProfit = 0;
  let totalExposure = 0;

  for (const inv of investments) {
    if (inv.status !== "CLOSED" || inv.profitCurrency || !inv.closedAt) continue;
    const sorted = inv.transactions
      .map((t) => ({ date: t.date, amount: toNumber(t.amount) }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    if (sorted.length === 0) continue;

    let balance = 0;
    let exposure = 0;
    for (let i = 0; i < sorted.length; i++) {
      balance += -sorted[i].amount;
      const segmentEnd = i + 1 < sorted.length ? sorted[i + 1].date : inv.closedAt;
      const segmentDays = (segmentEnd.getTime() - sorted[i].date.getTime()) / MS_PER_DAY;
      exposure += balance * segmentDays;
    }
    if (exposure <= 0) continue;

    totalProfit += toNumber(inv.profitAmount);
    totalExposure += exposure;
  }

  return totalExposure > 0 ? (totalProfit / totalExposure) * AVG_DAYS_PER_MONTH * 100 : null;
}

