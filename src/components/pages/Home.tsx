import React from 'react';
import { Box, Button, Text, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const navigateToTransactions = () => {
    navigate('/transactions');
  };

  return (
    <Box p="6" textAlign="center">
      <Heading as="h1" size="xl" mb="4">
        Personal Finance Tracker
      </Heading>
      <Text fontSize="lg" mb="4">
        Welcome to the Personal Finance Tracker! This app helps you keep track of your income and expenses, categorize your transactions, and view summary statistics to better manage your finances.
      </Text>
      <Button colorScheme="teal" onClick={navigateToTransactions}>
        Get Started
      </Button>
    </Box>
  );
};

export default Dashboard;
