import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Stack,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase-config";
const CompletedMatchesCard = () => {
  const [completedMatches, setCompletedMatches] = useState([
    { id: 1, title: "Team A vs Team B", result: "Team A won by 5 wickets" },
    { id: 2, title: "Team C vs Team D", result: "Team D won by 3 runs" },
  ]);
  useEffect(() => {
    const fetchOngoingMatches = async () => {
      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, where("status", "==", "completed"));
        const querySnapshot = await getDocs(q);

        const fetchedMatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // setCompletedMatches(fetchedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchOngoingMatches();
  }, []);
  const handleClick = (matchId) => {
    navigate(`/match-scorecard?matchId=${matchId}`);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Completed Matches
        </Typography>
        <List>
          {completedMatches.map((match) => (
            <ListItem key={match.id} disableGutters sx={{ mb: 2 }}>
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  px: 2,
                  py: 1,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Stack spacing={1}>
                  <Box display="flex" alignItems="center">
                    <SportsCricketIcon sx={{ mr: 1 }} color="primary" />
                    <Typography variant="h6">{match.title}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <EmojiEventsIcon sx={{ mr: 1 }} color="success" />
                    <Typography variant="body2" color="text.secondary">
                      {match.result}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CompletedMatchesCard;
