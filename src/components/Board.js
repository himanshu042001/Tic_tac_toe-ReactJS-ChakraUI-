// src/components/Board.js
import React from 'react';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

const Board = ({ size, board, onCellClick }) => {
  const cellBgColor = useColorModeValue('white', 'gray.600');
  const cellHoverColor = useColorModeValue('gray.200', 'gray.500');
  
  return (
    <SimpleGrid columns={size} spacing={1}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
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
            bg={cellBgColor}
            _hover={{ bg: cellHoverColor }}
          >
            {cell}
          </Box>
        ))
      )}
    </SimpleGrid>
  );
};

export default Board;
