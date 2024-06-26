import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import TransactionCard from './TransactionCard';
import { deleteTransaction } from '../../../redux/slices/transactionSlice';

jest.mock('../../../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);

const transaction = {
  id: 1,
  description: 'Salary',
  amount: 5000,
  type: 'income',
  category: 'Job',
  date: '2024-06-01',
};

describe('TransactionCard Component', () => {
  let store: MockStoreEnhanced<unknown> | Store<unknown, UnknownAction, unknown>;
  let mockDispatch: jest.Mock<unknown>;

  beforeEach(() => {
    store = mockStore({
      transactionReducer: {
        transactions: [transaction],
      },
    });

    mockDispatch = jest.fn();
    const { useAppDispatch, useAppSelector } = require('../../../redux/hooks');
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockReturnValue({ transactions: [transaction] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders transaction card correctly', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionCard transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('$5000')).toBeInTheDocument();
    expect(screen.getByText('Job')).toBeInTheDocument();
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();
  });

  test('opens details modal when Details button is clicked', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionCard transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Details'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('opens edit modal when Edit button is clicked', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionCard transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('dispatches deleteTransaction action when Delete button is clicked', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionCard transaction={transaction} />
        </ChakraProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDispatch).toHaveBeenCalledWith(deleteTransaction(transaction.id));
  });
});
