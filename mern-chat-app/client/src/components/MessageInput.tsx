import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, sendMessageAsync } from "../redux/slices/messageSlice";
import { RootState } from "../redux/store";
import { TextField, Button, Box } from "@mui/material";
import api from "../utils/api";

const MessageInput: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const users = useSelector((state: RootState) => state.users.users);
  const handleSend = async () => {
    setText("");
    if (text.trim() && activeChatId && currentUser) {
      const [id1, id2] = activeChatId.split("_");

      const receiverId = id1 === currentUser.id ? id2 : id1;
      const receiver = users.find((user) => user.id === receiverId);

      const recieverName = receiver ? receiver.name : null;

      const message = {
        chatId: activeChatId,
        senderId: currentUser.id,
        text,
        recieverName: recieverName || "",
        senderName: currentUser.name || "",
      };
      await dispatch(sendMessageAsync(message));
      dispatch(
        sendMessage({ chatId: activeChatId, senderId: currentUser.id, text })
      );
      setText("");
    }
  };

  return (
    <Box sx={{ display: "flex", padding: 1 }}>
      <TextField
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        size="small"
      />
      <Button variant="contained" onClick={handleSend} sx={{ marginLeft: 1 }}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
