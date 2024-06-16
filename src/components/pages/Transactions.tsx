import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import TransactionList from '../Transactions/TransitionsList/TransitionsList';
import Summary from '../Transactions/Summary/Summary';
import TransactionFormModal from '../Transactions/TransactionFormModal/TransactionFormModal';
import TransactionsFilter from '../Transactions/TransactionsFilter/TransactionsFilter';

const Transactions: React.FC = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  return (
    <Box p="6">
      <TransactionFormModal isOpen={isFormModalOpen} onClose={closeFormModal} />
      <TransactionsFilter />
      <TransactionList />
      <Button colorScheme="teal" onClick={openFormModal} mb="4">
        Add New Transaction
      </Button>
      <Summary />
    </Box>
  );
};

export default Transactions;
