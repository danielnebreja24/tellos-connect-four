import { Box, Typography } from "@mui/material";

export default function GameTitle() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 30,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        pb: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          textAlign: "center",
          color: "text.primary",
          fontWeight: 400,
        }}
      >
        Connect Four!
      </Typography>
      <Typography
        sx={{
          fontSize: "1em",
          textAlign: "center",
          color: "text.primary",
        }}
      >
        Get four of the same color in a row to win!
      </Typography>
    </Box>
  );
}
