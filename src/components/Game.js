// src/components/Game.js
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, SimpleGrid } from '@chakra-ui/react';

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

const Game = () => {
  const [size, setSize] = useState('');
  const [winStreak, setWinStreak] = useState('');
  const [gamesToPlay, setGamesToPlay] = useState('');
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isGameSetup, setIsGameSetup] = useState(true);

  const initializeBoard = (n) => {
    setBoard(Array(n).fill(null).map(() => Array(n).fill(null)));
  };

  const checkLine = (line) => {
    let count = 0;
    let lastPlayer = null;
    for (let cell of line) {
      if (cell === lastPlayer && cell !== null) {
        count++;
        if (count === parseInt(winStreak)) return true;
      } else {
        lastPlayer = cell;
        count = 1;
      }
    }
    return false;
  };

  const checkWinner = (board, size, winStreak) => {
    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) {
        return true;
      }
    }

    // Check diagonals
    for (let r = 0; r <= size - winStreak; r++) {
      for (let c = 0; c <= size - winStreak; c++) {
        const mainDiagonal = Array(winStreak).fill().map((_, k) => board[r + k][c + k]);
        const antiDiagonal = Array(winStreak).fill().map((_, k) => board[r + k][c + winStreak - k - 1]);
        if (checkLine(mainDiagonal) || checkLine(antiDiagonal)) {
          return true;
        }
      }
    }

    return false;
  };

  const handleCellClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
    );

    setBoard(newBoard);
    if (checkWinner(newBoard, parseInt(size), parseInt(winStreak))) {
      setWinner(currentPlayer);
      if (currentPlayer === 'X') {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
      setGamesPlayed(gamesPlayed + 1);
    } else if (newBoard.flat().every(cell => cell)) {
      setGamesPlayed(gamesPlayed + 1);
      setWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleWinStreakChange = (e) => {
    setWinStreak(e.target.value);
  };

  const handleGamesToPlayChange = (e) => {
    setGamesToPlay(e.target.value);
  };

  const startNewGame = () => {
    if (gamesPlayed < parseInt(gamesToPlay)) {
      initializeBoard(parseInt(size));
      setWinner(null);
      setCurrentPlayer('X');
    } else {
      setIsGameSetup(true);
    }
  };

  const handleStartGame = () => {
    if (size >= 3 && size <= 10 && winStreak >= 3 && winStreak <= size && gamesToPlay > 0) {
      setXWins(0);
      setOWins(0);
      setGamesPlayed(0);
      setIsGameSetup(false);
      initializeBoard(parseInt(size));
    } else {
      alert('Please enter valid inputs.');
    }
  };

  return (
    <VStack spacing={4}>
      {isGameSetup ? (
        <>
          <Box>
            <Text>Grid Size (3-10):</Text>
            <Input type="number" value={size} onChange={handleSizeChange} />
          </Box>
          <Box>
            <Text>Win Streak (3-{size}):</Text>
            <Input type="number" value={winStreak} onChange={handleWinStreakChange} />
          </Box>
          <Box>
            <Text>Number of Games to Play:</Text>
            <Input type="number" value={gamesToPlay} onChange={handleGamesToPlayChange} />
          </Box>
          <Button onClick={handleStartGame}>Start Game</Button>
        </>
      ) : (
        <>
          <Board size={parseInt(size)} board={board} onCellClick={handleCellClick} />
          {winner && (
            <Text fontSize="2xl" color="green.500">
              {winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} wins!`}
            </Text>
          )}
          <Text>X Wins: {xWins}</Text>
          <Text>O Wins: {oWins}</Text>
          <Text>Games Played: {gamesPlayed}/{gamesToPlay}</Text>
          <Button onClick={startNewGame}>Next Game</Button>
          {gamesPlayed === parseInt(gamesToPlay) && (
            <Text fontSize="2xl" color="blue.500">
              {xWins > oWins ? 'Player X wins the series!' : xWins < oWins ? 'Player O wins the series!' : 'The series is a draw!'}
            </Text>
          )}
        </>
      )}
    </VStack>
  );
};

export default Game;
