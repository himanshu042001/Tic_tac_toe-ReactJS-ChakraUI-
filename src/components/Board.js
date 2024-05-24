// src/components/Board.js
import React from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

// Board component representing the game grid
const Board = ({ size, board, onCellClick }) => {
  // Set background color for cells based on color mode
  const cellBgColor = useColorModeValue('white', 'gray.600');
  const cellHoverColor = useColorModeValue('gray.200', 'gray.500');
  
  return (
    // Render the game board as a grid
    <SimpleGrid columns={size} spacing={1}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          // Render each cell as a clickable box
          <Box
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            borderWidth="1px"
            borderRadius="md"
            boxSize="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="2xl"
            cursor="pointer"
            bg={cellBgColor} // Set background color
            _hover={{ bg: cellHoverColor }} // Change background color on hover
          >
            {cell} {/* Render the cell content (X, O, or null) */}
          </Box>
        ))
      )}
    </SimpleGrid>
  );
};

export default Board;

