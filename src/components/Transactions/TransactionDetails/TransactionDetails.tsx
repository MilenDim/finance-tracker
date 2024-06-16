import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Box, Text } from '@chakra-ui/react';

const TransactionDetails = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { transactions } = useSelector((state: RootState) => state.transactionReducer);
  const transaction = id && transactions.find(t => t.id === parseInt(id));

  if (!transaction) return <Text>Transaction not found</Text>;

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <Text>Description: {transaction.description}</Text>
      <Text>Amount: ${transaction.amount}</Text>
      <Text>Type: {transaction.type}</Text>
      <Text>Category: {transaction.category}</Text>
      <Text>Date: {transaction.date}</Text>
    </Box>
  );
};

export default TransactionDetails;
