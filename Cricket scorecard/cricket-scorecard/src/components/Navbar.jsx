import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar position="fixed">
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Cricket Scorecard
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
