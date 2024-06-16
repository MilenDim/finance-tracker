import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ChakraProvider } from '@chakra-ui/react';
import TransactionList from './TransitionsList';
import { Store, UnknownAction } from '@reduxjs/toolkit';

const mockStore = configureStore([]);

describe('TransactionList', () => {
  let store: Store<unknown, UnknownAction, unknown> | MockStoreEnhanced<unknown>;

  beforeEach(() => {
    store = mockStore({
      transactionReducer: {
        transactions: [
          { id: 1, description: 'Salary', amount: 1000, type: 'income', category: 'Job', date: '2024-06-01' },
          { id: 2, description: 'Groceries', amount: -200, type: 'expense', category: 'Food', date: '2024-06-02' },
        ],
      },
    });
  });

  test('renders "No transactions found" message when no filtered transactions', () => {
    store = mockStore({
        transactionReducer: {
          transactions: [],
        },
      });
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionList />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  test('renders transaction cards when there are filtered transactions', () => {
    store = mockStore({
      transactionReducer: {
        transactions: [
          { id: 1, description: 'Salary', amount: 1000, type: 'income', category: 'Job', date: '2024-06-01' },
          { id: 2, description: 'Groceries', amount: 200, type: 'expense', category: 'Food', date: '2024-06-02' },
        ],
        categoryFilter: '',
        dateRangeFilter: { startDate: null, endDate: null },
      },
    });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionList />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('Job')).toBeInTheDocument();
    expect(screen.getByText('2024-06-01')).toBeInTheDocument();

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('2024-06-02')).toBeInTheDocument();
  });
});
