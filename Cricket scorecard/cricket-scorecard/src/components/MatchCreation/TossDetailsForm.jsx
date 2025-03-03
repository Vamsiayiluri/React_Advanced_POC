import React, { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const TossDetailsForm = ({ data, teamData, onUpdate }) => {
  const teamAName = teamData.teamA.name;
  const teamBName = teamData.teamB.name;

  const [tossDetails, setTossDetails] = useState(
    data || { winner: "", decision: "" }
  );
  const [errors, setErrors] = useState({
    winner: "",
    decision: "",
  });

  const validateForm = () => {
    const newErrors = {
      winner: tossDetails.winner ? "" : "Please select the toss winner.",
      decision: tossDetails.decision
        ? ""
        : "Please select the decision (Bat or Bowl).",
    };
    setErrors(newErrors);

    return !newErrors.winner && !newErrors.decision;
  };

  const handleChange = (field, value) => {
    const updatedTossDetails = { ...tossDetails, [field]: value };
    setTossDetails(updatedTossDetails);

    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));

    onUpdate(updatedTossDetails);
  };

  return (
    <Box>
      <Stack width="400px">
        <FormControl fullWidth margin="normal" error={!!errors.winner}>
          <TextField
            select
            labelId="toss-winner-label"
            label="Toss Winner"
            value={tossDetails.winner}
            onChange={(e) => handleChange("winner", e.target.value)}
            helperText={errors.winner}
          >
            <MenuItem value={teamAName}>{teamAName}</MenuItem>
            <MenuItem value={teamBName}>{teamBName}</MenuItem>
          </TextField>
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.decision}>
          <TextField
            select
            label="Decision"
            labelId="toss-decision-label"
            value={tossDetails.decision}
            onChange={(e) => handleChange("decision", e.target.value)}
            helperText={errors.decision}
          >
            <MenuItem value="Bat">Bat</MenuItem>
            <MenuItem value="Bowl">Bowl</MenuItem>
          </TextField>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default TossDetailsForm;
