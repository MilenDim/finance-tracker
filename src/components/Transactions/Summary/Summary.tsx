import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { getFilteredTransactions } from "../../../utils/utils";

const Summary = (): React.ReactElement => {
  const { transactions, categoryFilter, dateRangeFilter } = useAppSelector(
    (state: RootState) => state.transactionReducer
  );

  const filteredTransactions = getFilteredTransactions(
    transactions,
    categoryFilter,
    dateRangeFilter
  );

  const totalIncome = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Box mt="8" p="4" borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold">
        Summary
      </Text>
      <Text>Total Income: ${totalIncome}</Text>
      <Text>Total Expenses: ${totalExpenses}</Text>
      <Text>Balance: ${balance}</Text>
    </Box>
  );
};

export default Summary;
