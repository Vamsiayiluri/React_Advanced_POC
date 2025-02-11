import React, { useEffect } from "react";
import { RootState } from "../redux/store";
import { Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../redux/slices/messageSlice";
const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const messages =
    useSelector(
      (state: RootState) => state.messages.messages[activeChatId ?? ""]
    ) || [];

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId));
    } else {
    }
  }, [activeChatId, messages.length]);
  return (
    <Box
      sx={{
        padding: 2,
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.length === 0 ? (
        <Typography variant="body2" color="textSecondary" textAlign="center">
          No messages yet
        </Typography>
      ) : (
        messages.map((msg) => {
          const isCurrentUser = msg.senderId === currentUser?.id;

          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                marginBottom: 1,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "8px 12px",
                  maxWidth: "70%",
                  backgroundColor: isCurrentUser ? "#dcf8c6" : "#ffffff",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: isCurrentUser ? "#256029" : "#333",
                  }}
                >
                  {isCurrentUser ? "You" : msg.senderName}
                </Typography>
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ChatWindow;
