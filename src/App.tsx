import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './components/pages/Home';
import Transactions from './components/pages/Transactions';
import { useAppDispatch } from './redux/hooks';
import { setTransactions } from './redux/slices/transactionSlice';

const App = (): React.ReactElement => {

  const dispatch = useAppDispatch();
  
  useEffect (() => {
    async function fetchData() {
      try {
        const response = await fetch('/transactions.json'); // Correct the path if needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { transactions } = await response.json();
        dispatch(setTransactions(transactions));
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    }

    fetchData();
  }, [dispatch]);
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
