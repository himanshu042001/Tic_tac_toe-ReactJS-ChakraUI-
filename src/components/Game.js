  import React, { useState } from 'react'; // Import React and useState hook
      import { Box, Button, Input, VStack, Text, useColorModeValue } from '@chakra-ui/react'; // Import Chakra UI components
      import Board from './Board'; // Import the Board component
      
      // Define the Game component
      const Game = () => {
        // State variables to manage game settings and state
        const [size, setSize] = useState(''); // State for grid size
        const [winStreak, setWinStreak] = useState(''); // State for win streak
        const [gamesToPlay, setGamesToPlay] = useState(''); // State for number of games to play
        const [board, setBoard] = useState([]); // State for game board
        const [currentPlayer, setCurrentPlayer] = useState('X'); // State for current player
        const [winner, setWinner] = useState(null); // State for winner of the game
        const [xWins, setXWins] = useState(0); // State for number of wins for player X
        const [oWins, setOWins] = useState(0); // State for number of wins for player O
        const [gamesPlayed, setGamesPlayed] = useState(0); // State for number of games played
        const [isGameSetup, setIsGameSetup] = useState(true); // State to track if the game setup is in progress
      
        // Function to initialize the game board
        const initializeBoard = (n) => {
          setBoard(Array(n).fill(null).map(() => Array(n).fill(null))); // Create a 2D array for the game board
        };
      
        // Function to check for a winning line
        const checkLine = (line) => {
          let count = 0; // Initialize count to 0
          let lastPlayer = null; // Initialize lastPlayer to null
          for (let cell of line) { // Loop through each cell in the line
            if (cell === lastPlayer && cell !== null) { // If the cell matches the last player and is not null
              count++; // Increment the count
              if (count === parseInt(winStreak)) return true; // If the count equals win streak, return true
            } else {
              lastPlayer = cell; // Update lastPlayer to the current cell
              count = 1; // Reset count to 1
            }
          }
          return false; // Return false if no winning line is found
        };
      
        // Function to check for a winner on the board
        const checkWinner = (board, size, winStreak) => {
          // Check rows and columns
          for (let i = 0; i < size; i++) {
            if (checkLine(board[i]) || checkLine(board.map(row => row[i]))) { // Check each row and column for winning lines
              return true; // If a winning line is found, return true
            }
          }
      
          // Check diagonals
          for (let r = 0; r <= size - winStreak; r++) {
            for (let c = 0; c <= size - winStreak; c++) {
              const mainDiagonal = Array(winStreak).fill().map((_, k) => board[r + k][c + k]); // Get main diagonal cells
              const antiDiagonal = Array(winStreak).fill().map((_, k) => board[r + k][c + winStreak - k - 1]); // Get anti diagonal cells
              if (checkLine(mainDiagonal) || checkLine(antiDiagonal)) { // Check diagonals for winning lines
                return true; // If a winning line is found, return true
              }
            }
          }
      
          return false; // Return false if no winner is found
        };
      
        // Function to handle cell click events
        const handleCellClick = (row, col) => {
          if (board[row][col] || winner) return; // If cell is already filled or there is a winner, return
      
          const newBoard = board.map((r, rowIndex) => // Create a new board with updated cell
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
          );
      
          setBoard(newBoard); // Update the game board
          if (checkWinner(newBoard, parseInt(size), parseInt(winStreak))) { // If there is a winner
            setWinner(currentPlayer); // Set the winner
            if (currentPlayer === 'X') { // If current player is X
              setXWins(xWins + 1); // Increment X wins
            } else {
              setOWins(oWins + 1); // Increment O wins
            }
            setGamesPlayed(gamesPlayed + 1); // Increment games
      setWinner('Draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Functions to handle input changes
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleWinStreakChange = (e) => {
    setWinStreak(e.target.value);
  };

  const handleGamesToPlayChange = (e) => {
    setGamesToPlay(e.target.value);
  };

  // Function to start a new game
  const startNewGame = () => {
    if (gamesPlayed < parseInt(gamesToPlay)) {
      initializeBoard(parseInt(size));
      setWinner(null);
      setCurrentPlayer('X');
    } else {
      setIsGameSetup(true);
    }
  };

  // Function to handle start game button click
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

  // Variables for styling
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <VStack spacing={4} p={4} bg={bgColor} borderRadius="md" boxShadow="lg">
      {isGameSetup ? (
        <>
          <Box>
            <Text mb={2} fontWeight="bold">Grid Size (3-10):</Text>
            <Input
              type="number"
              value={size}
              onChange={handleSizeChange}
              placeholder="Enter grid size"
              mb={4}
              size="lg"
            />
          </Box>
          <Box>
            <Text mb={2} fontWeight="bold">Win Streak (3-{size}):</Text>
            <Input
              type="number"
              value={winStreak}
              onChange={handleWinStreakChange}
              placeholder="Enter win streak"
              mb={4}
              size="lg"
            />
          </Box>
          <Box>
            <Text mb={2} fontWeight="bold">Number of Games to Play:</Text>
            <Input
              type="number"
              value={gamesToPlay}
              onChange={handleGamesToPlayChange}
              placeholder="Enter number of games"
              mb={4}
              size="lg"
            />
          </Box>
          <Button colorScheme="blue" size="lg" onClick={handleStartGame}>
            Start Game
          </Button>
        </>
      ) : (
        <>
          {/* Render the game board */}
          <Board size={parseInt(size)} board={board} onCellClick={handleCellClick} />

          {/* Display the winner or draw message */}
          {winner && (
            <Text fontSize="2xl" color="green.500" fontWeight="bold" mt={4}>
              {winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner} wins!`}
            </Text>
          )}

          {/* Display the number of wins for each player and games played */}
          <Text fontSize="lg" color="gray.600">
            X Wins: {xWins}
          </Text>
          <Text fontSize="lg" color="gray.600">
            O Wins: {oWins}
          </Text>
          <Text fontSize="lg" color="gray.600" mb={4}>
            Games Played: {gamesPlayed}/{gamesToPlay}
          </Text>
          <Button colorScheme="green" size="lg" onClick={startNewGame}>
            Next Game
          </Button>
          {gamesPlayed === parseInt(gamesToPlay) && (
            <Text fontSize="2xl" color="blue.500" fontWeight="bold" mt={4}>
              {xWins > oWins ? 'Player X wins the series!' : xWins < oWins ? 'Player O wins the series!' : 'The series is a draw!'}
            </Text>
          )}
        </>
      )}
    </VStack>
  );
};

export default Game;
