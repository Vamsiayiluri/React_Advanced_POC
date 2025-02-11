import * as React from "react";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";

export default function MuiAlert() {
  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success" variant="filled">
          This is a success Alert.
        </Alert>
        <Alert severity="info" variant="filled">
          This is an info Alert.
        </Alert>
        <Alert severity="warning" variant="outlined">
          This is a warning Alert.
        </Alert>
        <Alert severity="error" variant="outlined">
          This is an error Alert.
        </Alert>
      </Stack>
    </>
  );
}
