// src/components/Board.js
import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';

const Board = ({ size, board, onCellClick }) => {
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
          >
            {cell}
          </Box>
        ))
      )}
    </SimpleGrid>
  );
};

export default Board;
