import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';
import { Store, UnknownAction } from '@reduxjs/toolkit';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockStore = configureStore([]);

describe('TransactionDetails', () => {
  let store: MockStoreEnhanced<unknown> | Store<unknown, UnknownAction, unknown>;

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders transaction details for a valid transaction ID', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <TransactionDetails />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Description: Salary')).toBeInTheDocument();
    expect(screen.getByText('Amount: $1000')).toBeInTheDocument();
    expect(screen.getByText('Type: income')).toBeInTheDocument();
    expect(screen.getByText('Category: Job')).toBeInTheDocument();
    expect(screen.getByText('Date: 2024-06-01')).toBeInTheDocument();
  });

  test('renders "Transaction not found" for an invalid transaction ID', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <TransactionDetails />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Transaction not found')).toBeInTheDocument();
  });
});
