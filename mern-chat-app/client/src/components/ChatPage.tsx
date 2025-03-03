import React from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import {
  AppBar,
  Box,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const ChatPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "97vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar sx={{ height: "9vh" }} position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            CHILL CHAT
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ height: "calc(97vh - 9vh)", overflow: "hidden" }}>
        <Grid item xs={3} sx={{ height: "calc(97vh - 9vh)", overflow: "auto" }}>
          <Paper>
            <ChatList />
          </Paper>
        </Grid>

        {/* Chat Window & Message Input */}
        <Grid item xs={9} sx={{ height: "calc(97vh - 9vh)", overflow: "auto" }}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ChatWindow style={{ flexGrow: 1 }} />
            <MessageInput />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
