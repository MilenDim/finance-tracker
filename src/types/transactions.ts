export enum TransactionTypes {
  Income = "income",
  Expense = "expense",
}

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

export interface DateRange {
  startDate: string | undefined;
  endDate: string | undefined;
}
