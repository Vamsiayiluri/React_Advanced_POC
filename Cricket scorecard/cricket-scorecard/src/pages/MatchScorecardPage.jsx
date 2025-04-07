import { Box } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchScoreCard from "../components/match/MatchScoreCard";
import { useSearchParams } from "react-router-dom";
import { getMatch } from "../services/firebaseServices";

const MatchScoreCardPage = () => {
  const [showScoreCard, setShowScoreCard] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("hello");

    async function fetchMatchData() {
      const matchId = searchParams.get("matchId");
      if (matchId) {
        try {
          const data = await getMatch(matchId);
          console.log(data, "data");
          setMatchData(data);
        } catch (error) {
          console.error("Failed to fetch match data:", error);
        }
      }
    }
    fetchMatchData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <>
        {" "}
        <MatchScoreCard
          showScoreCard={showScoreCard}
          setShowScoreCard={setShowScoreCard}
          matchData={matchData}
        ></MatchScoreCard>
      </>
    </Box>
  );
};

export default MatchScoreCardPage;
