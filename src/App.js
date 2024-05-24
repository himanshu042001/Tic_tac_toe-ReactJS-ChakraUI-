// src/App.js
import React from 'react';
import Game from './components/Game';
import { Container, Heading, ChakraProvider, CSSReset, theme } from '@chakra-ui/react';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a202c", // Darker shade of gray for background
      800: "#2d3748", // Dark shade of gray for card
      700: "#4a5568", // Dark shade of gray for text
    },
  },
};

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Container centerContent>
        <Heading as="h1" my={4}>
          Tic-Tac-Toe
        </Heading>
        <Game />
      </Container>
    </ChakraProvider>
  );
}

export default App;
