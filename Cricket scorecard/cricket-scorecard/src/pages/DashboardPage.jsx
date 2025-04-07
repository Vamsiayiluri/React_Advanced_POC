import React, { useState } from "react";
import { Box, Tabs, Tab, Button, useMediaQuery, useTheme } from "@mui/material";
import OngoingMatchesCard from "../components/Dashboard/OngoingMatchesCard";
import UpcomingMatchesCard from "../components/Dashboard/UpcomingMatchesCard";
import CompletedMatchesCard from "../components/Dashboard/CompletedMatchesCard";

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Navigation Tabs */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          mb: 3,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          sx={{
            mb: isMobile ? 2 : 0,
            ".MuiTabs-indicator": { backgroundColor: "primary.main" },
          }}
        >
          <Tab label="Ongoing" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
        </Tabs>

        <Button
          variant="contained"
          color="primary"
          href="/create-match"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            padding: "8px 20px",
            fontWeight: 600,
            boxShadow: theme.shadows[2],
          }}
        >
          + Create New Match
        </Button>
      </Box>

      {/* Match Cards */}
      <Box>
        {selectedTab === 0 && <OngoingMatchesCard />}
        {selectedTab === 1 && <UpcomingMatchesCard />}
        {selectedTab === 2 && <CompletedMatchesCard />}
      </Box>
    </Box>
  );
};

export default DashboardPage;
