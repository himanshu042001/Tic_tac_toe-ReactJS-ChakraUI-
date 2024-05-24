// src/App.js
import React from 'react';
import Game from './components/Game';
import { Container, Heading, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container centerContent>
      <Flex justify="space-between" align="center" w="100%" mb={4} p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg" boxShadow="xl">
        <Heading as="h1" textAlign="center" flexGrow={1}>
          Tic-Tac-Toe
        </Heading>
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle dark mode"
        />
      </Flex>
      <Game />
    </Container>
  );
}

export default App;
