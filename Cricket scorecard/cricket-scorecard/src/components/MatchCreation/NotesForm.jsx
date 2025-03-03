import React, { useState } from "react";
import { TextField, Box, Stack, Typography } from "@mui/material";

const NotesForm = ({ data, onUpdate }) => {
  const [notes, setNotes] = useState(data || "");
  const [error, setError] = useState(null);

  const validateNotes = (value) => {
    if (value.length > 500) {
      setError("Notes cannot exceed 500 characters.");
      return false;
    }
    const regex = /^[A-Za-z0-9\s.,!?()-]*$/;
    if (!regex.test(value)) {
      setError("Notes contain invalid characters.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (value) => {
    setNotes(value);

    if (validateNotes(value)) {
      onUpdate(value);
    }
  };

  return (
    <Box>
      <Stack width="400px">
        <TextField
          label="Additional Notes"
          value={notes}
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!error}
          helperText={error || "Optional notes (max 500 characters)"}
        />
      </Stack>
    </Box>
  );
};

export default NotesForm;
