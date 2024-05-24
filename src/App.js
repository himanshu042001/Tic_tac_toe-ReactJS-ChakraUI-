// Import necessary dependencies and components
import React from 'react';
import Game from './components/Game'; // Import the Game component
import { Container, Heading, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'; // Import Chakra UI components
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun and moon icons from react-icons/fa

// Define the App component
function App() {
  // Get color mode and function to toggle color mode from Chakra UI
  const { colorMode, toggleColorMode } = useColorMode();

  // Return the JSX to render
  return (
    // Container component to center content
    <Container centerContent>
      {/* Flex container for header with space between items */}
      <Flex justify="space-between" align="center" w="100%" mb={4} p={4} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg" boxShadow="xl">
        {/* Heading component for the title */}
        <Heading as="h1" textAlign="center" flexGrow={1}>
          Tic-Tac-Toe
        </Heading>
        {/* IconButton to toggle dark mode */}
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} // Show moon icon for light mode and sun icon for dark mode
          onClick={toggleColorMode} // Toggle color mode on click
          variant="ghost" // Ghost variant for transparent background
          aria-label="Toggle dark mode" // Accessibility label
        />
      </Flex>
      {/* Render the Game component */}
      <Game />
    </Container>
  );
}

// Export the App component
export default App;
