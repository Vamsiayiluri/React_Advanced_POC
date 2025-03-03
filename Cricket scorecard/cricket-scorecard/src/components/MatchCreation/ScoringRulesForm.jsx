import React, { useState } from "react";
import { TextField, Box, Stack, Typography } from "@mui/material";

const ScoringRulesForm = ({ data, onUpdate }) => {
  const [scoringRules, setScoringRules] = useState(
    data || { overs: "", wide: "", noBall: "" }
  );
  const [errors, setErrors] = useState({
    overs: "",
    wide: "",
    noBall: "",
  });

  // Validation functions
  const validateOvers = (value) => {
    const overs = Number(value);
    return overs >= 1 && overs <= 50;
  };

  const validateRuns = (value) => {
    const runs = Number(value);
    return runs >= 0 && runs <= 10;
  };

  const handleChange = (field, value) => {
    const updatedScoringRules = { ...scoringRules, [field]: value };
    setScoringRules(updatedScoringRules);

    // Validate the field being updated
    let errorMessage = "";
    switch (field) {
      case "overs":
        errorMessage = validateOvers(value)
          ? ""
          : "Overs must be between 1 and 50.";
        break;
      case "wide":
      case "noBall":
        errorMessage = validateRuns(value)
          ? ""
          : "Runs must be between 0 and 10.";
        break;
      default:
        break;
    }

    // Update errors state
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));

    // Only update parent if there are no errors
    if (!errorMessage) {
      onUpdate({ ...updatedScoringRules, [field]: Number(value) });
    }
  };

  return (
    <Box>
      <Stack width="400px">
        <TextField
          label="Overs Per Side"
          value={scoringRules.overs}
          onChange={(e) => handleChange("overs", e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          error={!!errors.overs}
          helperText={errors.overs}
        />
        <TextField
          label="Runs for Wide"
          value={scoringRules.wide}
          onChange={(e) => handleChange("wide", e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          error={!!errors.wide}
          helperText={errors.wide}
        />
        <TextField
          label="Runs for No-Ball"
          value={scoringRules.noBall}
          onChange={(e) => handleChange("noBall", e.target.value)}
          fullWidth
          margin="normal"
          type="number"
          error={!!errors.noBall}
          helperText={errors.noBall}
        />
      </Stack>
    </Box>
  );
};

export default ScoringRulesForm;