import React from 'react';
import { Box, Heading, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <HStack spacing={8}>
        <Heading size="md">Finance Tracker</Heading>
        <Link as={RouterLink} to="/">Dashboard</Link>
        <Link as={RouterLink} to="/transactions">Transactions</Link>
      </HStack>
    </Box>
  );
};

export default Header;