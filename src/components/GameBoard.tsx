import { Box, Button, Grid } from "@mui/material";
import type { Board, Player } from "../interfaces";
import type { ReactNode } from "react";

interface GameBoardProps {
  columns: number;
  board: Board;
  currentPlayer: Player;
  gameStatus: string;
  dropPiece: (col: number) => void;
  isColumnFull: (col: number) => boolean;
  getCellIcon: (cell: Player | null) => ReactNode | null;
}

export default function GameBoard({
  columns,
  board,
  currentPlayer,
  gameStatus,
  getCellIcon,
  dropPiece,
  isColumnFull,
}: GameBoardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minWidth: "100%",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "100%",
          width: "fit-content",
        }}
      >
        {Array.from({ length: columns }, (_, i) => i).map((col) => (
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
            size={12 / columns}
            key={col}
            onClick={() => dropPiece(col)}
          >
            {getCellIcon(currentPlayer)}
          </Grid>
        ))}
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Grid size={12 / columns} key={`${rowIdx}-${colIdx}`}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => dropPiece(colIdx)}
                disabled={gameStatus !== "playing" || isColumnFull(colIdx)}
                fullWidth
              >
                {getCellIcon(cell)}
              </Button>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
