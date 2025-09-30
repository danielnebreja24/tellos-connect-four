import React, { useState, useCallback, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  Button,
  Box,
} from "@mui/material";
import type {
  Board,
  CellValue,
  ColorTheme,
  GameStatus,
  Player,
} from "./interfaces";
import GameBoard from "./components/GameBoard";
import GameTitle from "./components/GameTitle";
import GameWinnerStatus from "./components/GameWinnerStatus";

const ROWS = 4;
const COLS = 4;

const THEME_COLOR = "blue" as ColorTheme; // Change to 'purple' or 'green' or 'blue' as needed

const ConnectFour: React.FC = () => {
  const [board, setBoard] = useState<Board>(() =>
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("red");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [winner, setWinner] = useState<Player | null>(null);

  const theme = useMemo(() => {
    const colorMap: Record<ColorTheme, string> = {
      purple: "#9c27b0",
      green: "#4caf50",
      blue: "#1976d2",
    };

    return createTheme({
      palette: {
        primary: { main: colorMap[THEME_COLOR] },
      },
    });
  }, []);

  const checkWinner = useCallback(
    (board: Board, row: number, col: number, player: Player): boolean => {
      const inBounds = (r: number, c: number) =>
        r >= 0 && r < ROWS && c >= 0 && c < COLS;

      const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
      ];

      for (const [dr, dc] of directions) {
        let count = 1;

        for (const sign of [1, -1]) {
          let r = row + dr * sign;
          let c = col + dc * sign;

          while (inBounds(r, c) && board[r][c] === player) {
            count++;
            r += dr * sign;
            c += dc * sign;
          }
        }

        if (count >= 4) return true;
      }

      return false;
    },
    []
  );

  const dropPiece = useCallback(
    (col: number) => {
      if (gameStatus !== "playing") return;

      let targetRow = -1;
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
          targetRow = row;
          break;
        }
      }

      if (targetRow === -1) return;

      const newBoard = board.map((row) => [...row]);
      newBoard[targetRow][col] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard, targetRow, col, currentPlayer)) {
        setGameStatus("won");
        setWinner(currentPlayer);
        return;
      }

      const isBoardFull = newBoard.every((row) =>
        row.every((cell) => cell !== null)
      );
      if (isBoardFull) {
        setGameStatus("draw");
        return;
      }

      setCurrentPlayer(currentPlayer === "red" ? "black" : "red");
    },
    [board, currentPlayer, gameStatus, checkWinner]
  );

  const resetGame = useCallback(() => {
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(null))
    );
    setCurrentPlayer("red");
    setGameStatus("playing");
    setWinner(null);
  }, []);

  const getCellIcon = useCallback((cell: CellValue): string => {
    switch (cell) {
      case "red":
        return "🔴";
      case "black":
        return "⚫";
      default:
        return "⬜";
    }
  }, []);

  const isColumnFull = useCallback(
    (col: number): boolean => {
      return board[0][col] !== null;
    },
    [board]
  );

  const buttonLabel = useMemo(() => {
    return gameStatus === "won" ? "New Game" : "Reset Board";
  }, [gameStatus]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          bgcolor: "grey.100",
          p: 4,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container fixed>
          {/* Title Component */}
          <GameTitle />

          {/* Winner Status Component */}
          <GameWinnerStatus
            winner={winner}
            gameStatus={gameStatus}
            getCellIcon={getCellIcon}
          />

          {/* Game Board Component */}
          <GameBoard
            columns={COLS}
            board={board}
            currentPlayer={currentPlayer}
            gameStatus={gameStatus}
            getCellIcon={getCellIcon}
            dropPiece={dropPiece}
            isColumnFull={isColumnFull}
          />

          {/* Game Button Status */}
          <Box sx={{ textAlign: "center", m: 3 }}>
            <Button
              variant="text"
              color="primary"
              onClick={resetGame}
              size="large"
            >
              {buttonLabel}
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ConnectFour;
