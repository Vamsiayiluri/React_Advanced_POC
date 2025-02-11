import React from "react";
import { Paper, Typography } from "@mui/material";

export default function MuiPaper() {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, maxWidth: 400, margin: "auto", textAlign: "center" }}
    >
      <Typography variant="h5" gutterBottom>
        MUI Paper Sample
      </Typography>
      <Typography variant="body1">Hello everyone</Typography>
    </Paper>
  );
}
