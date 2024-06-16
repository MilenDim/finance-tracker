import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { addTransaction, editTransaction } from "../../../redux/slices/transactionSlice";
import { Transaction, TransactionTypes } from "../../../types/transactions";
import { categories } from "../../../constants/constants";
import { useAppDispatch } from "../../../redux/hooks";

interface TransactionFormModalProps {
  isOpen: boolean;
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const dispatch = useAppDispatch();
  const [transactionData, setTransactionData] = useState({
    description: "",
    amount: 0,
    type: TransactionTypes.Income,
    category: "",
    date: "",
  });

  useEffect(() => {
    isOpen &&
      transaction &&
      setTransactionData({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type as TransactionTypes,
        category: transaction.category,
        date: transaction.date,
      });
  }, [isOpen, transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      id: transaction ? transaction.id : Date.now(), // Generate a simple unique id
      description: transactionData.description,
      amount: transactionData.amount,
      type: transactionData.type,
      category: transactionData.category,
      date: transactionData.date,
    };
    transaction
      ? dispatch(editTransaction(newTransaction))
      : dispatch(addTransaction(newTransaction));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Input
                value={transactionData.description}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    description: e.target.value,
                  })
                }
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={transactionData.amount}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    amount: Number(e.target.value),
                  })
                }
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Type</FormLabel>
              <Select
                value={transactionData.type}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    type: e.target.value as TransactionTypes,
                  })
                }
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Category</FormLabel>
              <Select
                value={transactionData.category}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={transactionData.date}
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    date: e.target.value,
                  })
                }
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionFormModal;
