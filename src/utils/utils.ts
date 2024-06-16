import { Transaction, DateRange } from "../types/transactions";

export const getFilteredTransactions = (
  transactions: Transaction[],
  categoryFilter?: string,
  dateRangeFilter?: DateRange | null
): Transaction[] => {
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory = categoryFilter
      ? transaction.category === categoryFilter
      : true;
    const matchesDateRange = dateRangeFilter
      ? (!dateRangeFilter.startDate ||
          new Date(transaction.date) >= new Date(dateRangeFilter?.startDate)) &&
        (!dateRangeFilter.endDate ||
          new Date(transaction.date) <= new Date(dateRangeFilter.endDate))
      : true;

    return matchesCategory && matchesDateRange;
  });

  return filteredTransactions;
};
