import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: number | null;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  onClose,
  transactionId,
}) => {
  const { transactions } = useAppSelector(
    (state: RootState) => state.transactionReducer
  );

  if (!transactions) {
    return <div>Loading...</div>;
  }

  const transaction = transactions.find((t) => t.id === transactionId);
  if (!transaction) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">{transaction.description}</Text>
          <Text>Amount: ${transaction.amount}</Text>
          <Text>Type: {transaction.type}</Text>
          <Text>Category: {transaction.category}</Text>
          <Text>Date: {transaction.date}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionDetailsModal;
