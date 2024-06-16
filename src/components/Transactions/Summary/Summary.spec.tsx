import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ChakraProvider } from '@chakra-ui/react';
import Summary from './Summary';
import { useAppSelector } from '../../../redux/hooks';
import { getFilteredTransactions } from '../../../utils/utils';
import { Store, UnknownAction } from '@reduxjs/toolkit';

jest.mock('../../../redux/hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../../../utils/utils', () => ({
  getFilteredTransactions: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Summary Component', () => {
  let store: Store<unknown, UnknownAction, unknown> | MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      transactionReducer: {
        transactions: [],
        categoryFilter: '',
        dateRangeFilter: null,
      },
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders summary with zero transactions', () => {
    (getFilteredTransactions as jest.Mock).mockReturnValue([]);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <Summary />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Total Income: $0')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses: $0')).toBeInTheDocument();
    expect(screen.getByText('Balance: $0')).toBeInTheDocument();
  });

  test('calculates and displays summary correctly with transactions', () => {
    const transactions = [
      { id: 1, description: 'Salary', amount: 1000, type: 'income', category: 'Job', date: '2024-06-01' },
      { id: 2, description: 'Groceries', amount: 200, type: 'expense', category: 'Food', date: '2024-06-02' },
    ];
    (getFilteredTransactions as jest.Mock).mockReturnValue(transactions);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <Summary />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Total Income: $1000')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses: $200')).toBeInTheDocument();
    expect(screen.getByText('Balance: $800')).toBeInTheDocument();
  });

  test('filters transactions based on category and date range', () => {
    const transactions = [
      { id: 1, description: 'Salary', amount: 1000, type: 'income', category: 'Job', date: '2024-06-01' },
      { id: 2, description: 'Groceries', amount: -200, type: 'expense', category: 'Food', date: '2024-06-02' },
    ];
    const filteredTransactions = transactions.filter(transaction => transaction.category === 'Job');

    (useAppSelector as jest.Mock).mockReturnValue({
      transactions,
      categoryFilter: 'Job',
      dateRangeFilter: null,
    });

    (getFilteredTransactions as jest.Mock).mockReturnValue(filteredTransactions);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <Summary />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Total Income: $1000')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses: $0')).toBeInTheDocument();
    expect(screen.getByText('Balance: $1000')).toBeInTheDocument();
  });
});
