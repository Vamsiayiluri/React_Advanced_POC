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
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const OngoingMatchesCard = () => {
  const [ongoingMatches, setOngoingMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOngoingMatches = async () => {
      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, where("status", "==", "in-progress"));
        const querySnapshot = await getDocs(q);

        const fetchedMatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOngoingMatches(fetchedMatches);
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
          Ongoing Matches
        </Typography>
        <List>
          {ongoingMatches.map((match, index) => (
            <ListItem key={index} disableGutters>
              <Card
                onClick={() => {
                  handleClick(match.id);
                }}
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 2,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      {match.matchDetails?.name
                        ? match.matchDetails.name
                        : `${match.matchDetails?.teamA} vs ${match.matchDetails?.teamB}`}
                    </Typography>

                    <Box>
                      {match.scoreCard?.currentInning === 2 ? (
                        <Stack spacing={1}>
                          <Typography variant="body1">
                            {match.scoreCard.innings[0].team === "teamA"
                              ? match.teams.teamA.name
                              : match.teams.teamB.name}{" "}
                            : {match.scoreCard.innings[0].runs} /{" "}
                            {match.scoreCard.innings[0].wickets} (
                            {match.scoreCard.innings[0].overs})
                          </Typography>
                          <Typography variant="body1">
                            {match.scoreCard.innings[1].team === "teamA"
                              ? match.teams.teamA.name
                              : match.teams.teamB.name}{" "}
                            : {match.scoreCard.innings[1].runs} /{" "}
                            {match.scoreCard.innings[1].wickets} (
                            {match.scoreCard.innings[1].overs})
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="body1">
                          {match.scoreCard.innings[0].team === "teamA"
                            ? match.teams.teamA.name
                            : match.teams.teamB.name}{" "}
                          : {match.scoreCard.innings[0].runs} /{" "}
                          {match.scoreCard.innings[0].wickets} (
                          {match.scoreCard.innings[0].overs})
                        </Typography>
                      )}
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

export default OngoingMatchesCard;
