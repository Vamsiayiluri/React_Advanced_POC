import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../redux/store";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../redux/slices/messageSlice";

interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
}

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();

  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const [activeChat, setActiveChat] = useState<Chat>();
  const messages =
    useSelector(
      (state: RootState) => state.messages.messages[activeChatId ?? ""]
    ) || [];
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const chats = useSelector((state: RootState) => state.chats.chats);
  const users = useSelector((state: RootState) => state.users.users);

  const getChatParticipantName = (chat: Chat): string => {
    const otherParticipantId = chat?.participants?.find(
      (id) => id !== loggedInUser.id
    );
    const otherParticipant = users?.find(
      (user) => user.id === otherParticipantId
    );
    return otherParticipant ? otherParticipant.name : "Unknown";
  };

  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages(activeChatId));
      const activeChat = chats.find((chat) => chat.id === activeChatId);
      setActiveChat(activeChat);
    }
  }, [activeChatId, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        height: "500px", // Set a fixed height
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Chat Header (Fixed) */}
      {activeChat && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            padding: 2,
            backgroundColor: "#f5f5f5",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Avatar
            src={`https://i.pravatar.cc/40?img=${activeChat.id}`}
            sx={{ marginRight: 1 }}
          />
          <Typography variant="h6">
            {getChatParticipantName(activeChat)}
          </Typography>
        </Box>
      )}

      {/* Messages Section (Scrollable) */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
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
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatWindow;
