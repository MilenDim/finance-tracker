import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction, DateRange } from "../../types/transactions";

interface TransactionsState {
  transactions: Transaction[];
  categoryFilter: string | "";
  dateRangeFilter: DateRange | null;
}

const initialState: TransactionsState = {
  transactions: [],
  categoryFilter: "",
  dateRangeFilter: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    editTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    setCategoryFilter(state, action: PayloadAction<string | "">) {
      state.categoryFilter = action.payload;
    },
    setDateRangeFilter(state, action: PayloadAction<DateRange | null>) {
      state.dateRangeFilter = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  setCategoryFilter,
  setDateRangeFilter,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
