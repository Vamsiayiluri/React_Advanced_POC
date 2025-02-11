import React from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import { Box, Grid, Paper } from "@mui/material";

const ChatPage: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={3}>
        <Paper sx={{ padding: 2, height: "100%" }}>
          <ChatList />
        </Paper>
      </Grid>

      {/* Chat Window */}
      <Grid item xs={9}>
        <Paper
          sx={{
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatWindow />
          <MessageInput />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
