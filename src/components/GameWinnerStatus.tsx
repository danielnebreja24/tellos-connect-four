import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { Player } from "../interfaces";

interface GameWinnerStatusProps {
  winner: Player | null;
  gameStatus: string;
  getCellIcon: (cell: Player | null) => ReactNode | null;
}

export default function GameWinnerStatus({
  winner,
  gameStatus,
  getCellIcon,
}: GameWinnerStatusProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mb: 3,
      }}
    >
      {gameStatus === "draw" && (
        <Typography
          sx={{
            color: "text.primary",
          }}
        >
          It's a draw!
        </Typography>
      )}

      {winner && (
        <Typography
          sx={{
            color: "text.primary",
          }}
        >
          Winner is {getCellIcon(winner)}!
        </Typography>
      )}
    </Box>
  );
}
