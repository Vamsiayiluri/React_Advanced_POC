import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TeamsSetupForm = ({ data, teamData, onUpdate }) => {
  const matchData =
    Object.keys(data).length === 0
      ? {
          teamA: { name: teamData.teamA, players: [], newPlayer: "" },
          teamB: { name: teamData.teamB, players: [], newPlayer: "" },
        }
      : data;

  const [teams, setTeams] = useState(matchData);
  const [error, setError] = useState(null);

  const validatePlayerName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name) && name.trim().length > 0;
  };

  // Handle team data changes
  const handleTeamChange = (teamKey, field, value) => {
    const updatedTeams = {
      ...teams,
      [teamKey]: { ...teams[teamKey], [field]: value },
    };
    setTeams(updatedTeams);
    onUpdate(updatedTeams);
  };
  useEffect(() => {
    const updatedTeams = {
      ...teams,
      ["teamA"]: { ...teams["teamA"], ["newPlayer"]: "" },
    };
    setTeams(updatedTeams);
  }, [teams["teamA"].players]);
  useEffect(() => {
    const updatedTeams = {
      ...teams,
      ["teamB"]: { ...teams["teamB"], ["newPlayer"]: "" },
    };
    setTeams(updatedTeams);
  }, [teams["teamB"].players]);
  // Add a player to a team

  const addPlayer = (teamKey) => {
    const newPlayer = teams[teamKey].newPlayer.trim();

    // Validate player name
    if (!validatePlayerName(newPlayer)) {
      setError("Invalid player name (only alphabets and spaces allowed).");
      return;
    }

    // Check for duplicate player names
    if (teams[teamKey].players.includes(newPlayer)) {
      setError("Player name already exists in this team.");
      return;
    }

    // Add player to the team
    const updatedPlayers = [...teams[teamKey].players, newPlayer];
    handleTeamChange(teamKey, "players", updatedPlayers);
  };

  // Remove a player from a team
  const removePlayer = (teamKey, index) => {
    const updatedPlayers = teams[teamKey].players.filter(
      (_, playerIndex) => playerIndex !== index
    );
    handleTeamChange(teamKey, "players", updatedPlayers);
  };

  // Clear error message
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={{ marginTop: "32px" }}>
      <Stack direction="row" spacing={2}>
        {["teamA", "teamB"].map((teamKey, idx) => (
          <Box key={teamKey} sx={{ marginBottom: "16px" }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {idx === 0 ? teamData.teamA : teamData.teamB}
            </Typography>
            <Stack spacing={3} direction="row" width="400px">
              <TextField
                label="Add Player"
                placeholder="Enter player name"
                value={teams[teamKey].newPlayer}
                onChange={(e) =>
                  handleTeamChange(teamKey, "newPlayer", e.target.value)
                }
                margin="normal"
                error={!!error}
              />
              <Button
                sx={{
                  marginTop: "8px !important",
                  marginBottom: "23px !important",
                }}
                onClick={() => addPlayer(teamKey)}
                variant="outlined"
              >
                Add Player
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Display players for both teams */}
      {(teams.teamA?.players || teams.teamB?.players) && (
        <Box sx={{ marginTop: 2, marginBottom: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {teams.teamA?.players.map((player, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    marginBottom: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "240px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", paddingLeft: "16px" }}
                  >
                    {player || "Player not named"}
                  </Typography>
                  <IconButton
                    onClick={() => removePlayer("teamA", index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} sm={6}>
              {teams.teamB?.players.map((player, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    marginBottom: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "240px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      paddingLeft: "16px",
                    }}
                  >
                    {player || "Player not named"}
                  </Typography>
                  <IconButton
                    onClick={() => removePlayer("teamB", index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert severity="error" onClose={handleCloseError}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamsSetupForm;
