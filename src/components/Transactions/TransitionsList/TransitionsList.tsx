import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { getFilteredTransactions } from "../../../utils/utils";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import TransactionCard from "../TransactionCard/TransactionCard";

const TransactionList = (): React.ReactElement => {
  const { transactions, categoryFilter, dateRangeFilter } = useAppSelector(
    (state: RootState) => state.transactionReducer
  );

  const filteredTransactions = getFilteredTransactions(
    transactions,
    categoryFilter,
    dateRangeFilter
  );

  return (
    <Box display="flex" gap="20px" flexFlow="wrap">
      {filteredTransactions.length === 0 ? (
        <Text>No transactions found</Text>
      ) : (
        filteredTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))
      )}
    </Box>
  );
};

export default TransactionList;
