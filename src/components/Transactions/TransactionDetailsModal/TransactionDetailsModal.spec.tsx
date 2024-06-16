import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import { ChakraProvider } from '@chakra-ui/react';
import TransactionDetailsModal from './TransactionDetailsModal';

const mockStore = configureStore([]);

describe('TransactionDetailsModal Component', () => {
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

  test('renders transaction details when modal is open and valid transactionId is provided', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionDetailsModal isOpen={true} onClose={() => {}} transactionId={1} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Amount: $1000')).toBeInTheDocument();
    expect(screen.getByText('Type: income')).toBeInTheDocument();
    expect(screen.getByText('Category: Job')).toBeInTheDocument();
    expect(screen.getByText('Date: 2024-06-01')).toBeInTheDocument();
  });

  test('renders nothing when modal is closed', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionDetailsModal isOpen={false} onClose={() => {}} transactionId={1} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
  });

  test('renders nothing when transactionId is invalid', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <TransactionDetailsModal isOpen={true} onClose={() => {}} transactionId={999} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
  });
});
