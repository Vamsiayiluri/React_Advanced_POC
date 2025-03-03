import React, { useEffect, useState } from "react";
import { TextField, Box, Stack, Typography } from "@mui/material";

const MatchDetailsForm = ({ data, onUpdate }) => {
  const [matchDetails, setMatchDetails] = useState(data);
  const [errors, setErrors] = useState({
    teamA: "",
    teamB: "",
    dateTime: "",
    venue: "",
  });
  useEffect(() => {
    setMatchDetails(data);
  }, [data]);
  // Validation functions
  const validateTeamName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name) && name.trim().length > 0;
  };

  const validateDateTime = (dateTime) => {
    const selectedDate = new Date(dateTime);
    const currentDate = new Date();
    return selectedDate > currentDate;
  };

  const validateVenue = (venue) => {
    return venue.trim().length > 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...matchDetails, [name]: value };
    setMatchDetails(updatedDetails);

    // Validate the field being updated
    let errorMessage = "";
    switch (name) {
      case "teamA":
        errorMessage = validateTeamName(value)
          ? ""
          : "Invalid team name (only alphabets and spaces allowed).";
        break;
      case "teamB":
        errorMessage = validateTeamName(value)
          ? ""
          : "Invalid team name (only alphabets and spaces allowed).";
        break;
      case "dateTime":
        errorMessage = validateDateTime(value)
          ? ""
          : "Match date and time must be in the future.";
        break;
      case "venue":
        errorMessage = validateVenue(value) ? "" : "Venue cannot be empty.";
        break;
      default:
        break;
    }

    // Update errors state
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));

    // Only update parent if there are no errors
    if (!errorMessage) {
      onUpdate(updatedDetails);
    }
  };

  return (
    <Box>
      <Stack width="400px">
        <TextField
          label="Team A Name"
          name="teamA"
          value={matchDetails.teamA || ""}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={!!errors.teamA}
          helperText={errors.teamA}
        />
        <TextField
          label="Team B Name"
          name="teamB"
          value={matchDetails.teamB || ""}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={!!errors.teamB}
          helperText={errors.teamB}
        />
        <TextField
          label="Match Date & Time"
          name="dateTime"
          type="datetime-local"
          value={matchDetails.dateTime || ""}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          error={!!errors.dateTime}
          helperText={errors.dateTime}
        />
        <TextField
          label="Venue"
          name="venue"
          value={matchDetails.venue || ""}
          onChange={handleChange}
          margin="normal"
          fullWidth
          error={!!errors.venue}
          helperText={errors.venue}
        />
      </Stack>
    </Box>
  );
};

export default MatchDetailsForm;