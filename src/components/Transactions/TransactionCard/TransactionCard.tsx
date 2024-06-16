import React from "react";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import TransactionDetailsModal from "../TransactionDetailsModal/TransactionDetailsModal";
import { Transaction } from "../../../types/transactions";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteTransaction } from "../../../redux/slices/transactionSlice";
import TransactionFormModal from "../TransactionFormModal/TransactionFormModal";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({
  transaction,
}: TransactionCardProps): React.ReactElement => {
    const dispatch = useAppDispatch();
    const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  
    const handleDelete = () => {
      dispatch(deleteTransaction(transaction.id));
    };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mb="4">
      <Text fontWeight="bold">{transaction.description}</Text>
      <Text>${transaction.amount}</Text>
      <Text>{transaction.category}</Text>
      <Text>{transaction.date}</Text>
      <Box mt="4">
        <Button colorScheme="teal" size="sm" mr="2" onClick={onDetailsOpen}>
          Details
        </Button>
        <Button colorScheme="blue" size="sm" mr="2" onClick={onEditOpen}>
          Edit
        </Button>
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <TransactionDetailsModal isOpen={isDetailsOpen} onClose={onDetailsClose} transactionId={transaction.id} />
      <TransactionFormModal isOpen={isEditOpen} onClose={onEditClose} transaction={transaction} />
    </Box>
  );
};

export default TransactionCard;
