const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateFormatter.format(d);
}

export function formatCurrency(amount: number, currency: string = "LKR"): string {
  try {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export function formatGrams(amount: number): string {
  return `${amount.toFixed(2)} g`;
}

/** Formats a ledger amount using the right unit for the investment's asset type (money or grams of gold). */
export function formatInvestmentAmount(
  amount: number,
  investment: { assetType: string; currency: string }
): string {
  return investment.assetType === "GOLD" ? formatGrams(amount) : formatCurrency(amount, investment.currency);
}

/** Formats a profit/return figure, using `profitCurrency` when the investment pays cash profit on a non-currency principal. */
export function formatProfitAmount(
  amount: number,
  investment: { assetType: string; currency: string; profitCurrency?: string | null }
): string {
  if (investment.profitCurrency) return formatCurrency(amount, investment.profitCurrency);
  return formatInvestmentAmount(amount, investment);
}

/** Formats a single ledger transaction, which may be in `profitCurrency` (positive/profit entries) while the investment's own unit covers principal (negative entries). */
export function formatTransactionAmount(
  amount: number,
  investment: { assetType: string; currency: string; profitCurrency?: string | null }
): string {
  if (investment.profitCurrency && amount > 0) return formatCurrency(amount, investment.profitCurrency);
  return formatInvestmentAmount(amount, investment);
}

export function formatPercent(value: number, digits = 2): string {
  return `${value.toFixed(digits)}%`;
}

export function toDateInputValue(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}
