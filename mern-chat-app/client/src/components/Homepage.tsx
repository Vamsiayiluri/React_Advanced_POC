import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Homepage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Chat App</h1>
      <p>
        Connect with friends in real-time, share messages, and enjoy seamless
        communication!
      </p>
      <div>
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="outlined" color="primary" style={{ margin: "10px" }}>
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
