import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase-config";

const UpcomingMatchesCard = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  useEffect(() => {
    const fetchOngoingMatches = async () => {
      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, where("status", "==", "scheduled"));
        const querySnapshot = await getDocs(q);

        const fetchedMatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUpcomingMatches(fetchedMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchOngoingMatches();
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upcoming Matches
        </Typography>
        <List>
          {upcomingMatches.map((match) => (
            <ListItem key={match.id} disableGutters sx={{ mb: 2 }}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      {match.matchDetails?.name
                        ? match.matchDetails.name
                        : `${match.matchDetails?.teamA} vs ${match.matchDetails?.teamB}`}
                    </Typography>

                    <Box display="flex" alignItems="center">
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {match.matchDetails.date}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {match.matchDetails.location}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchesCard;
