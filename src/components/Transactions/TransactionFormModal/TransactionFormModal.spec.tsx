import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ChakraProvider } from '@chakra-ui/react';
import TransactionFormModal from './TransactionFormModal';
import { useAppDispatch } from '../../../redux/hooks';
import { Transaction, TransactionTypes } from '../../../types/transactions';
import { addTransaction, editTransaction } from '../../../redux/slices/transactionSlice';

jest.mock('../../../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);

const transaction: Transaction = {
  id: 1,
  description: 'Salary',
  amount: 5000,
  type: TransactionTypes.Income,
  category: 'Job',
  date: '2024-06-01',
};

describe('TransactionFormModal', () => {
  let store: Store<unknown, UnknownAction, unknown> | MockStoreEnhanced<unknown>;
  let mockDispatch: jest.Mock<unknown>;

  beforeEach(() => {
    store = mockStore({
      transactionReducer: {
        transactions: [transaction],
      },
    });

    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders add new transaction modal correctly', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionFormModal isOpen={true} onClose={jest.fn()} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  test('renders edit transaction modal correctly', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionFormModal isOpen={true} onClose={jest.fn()} transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Edit Transaction')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Salary')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Job')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-06-01')).toBeInTheDocument();
  });

  test('submits new transaction correctly', () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionFormModal isOpen={true} onClose={handleClose} />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Groceries' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'expense' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Food' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-06-15' } });

    fireEvent.click(screen.getByText('Add Transaction'));

    expect(mockDispatch).toHaveBeenCalledWith(addTransaction(expect.objectContaining({
      description: 'Groceries',
      amount: 200,
      type: TransactionTypes.Expense,
      category: 'Food',
      date: '2024-06-15',
    })));

    expect(handleClose).toHaveBeenCalled();
  });

  test('edits existing transaction correctly', () => {
    const handleClose = jest.fn();

    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionFormModal isOpen={true} onClose={handleClose} transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Salary' } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '5500' } });
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'income' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Job' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-06-01' } });

    fireEvent.click(screen.getByText('Save Changes'));

    expect(mockDispatch).toHaveBeenCalledWith(editTransaction(expect.objectContaining({
      id: 1,
      description: 'Updated Salary',
      amount: 5500,
      type: TransactionTypes.Income,
      category: 'Job',
      date: '2024-06-01',
    })));

    expect(handleClose).toHaveBeenCalled();
  });
});
