import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setActiveChat,
  fetchChats,
  createChat,
} from "../redux/slices/chatSlice";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Autocomplete,
} from "@mui/material";
import { fetchUsers } from "../redux/slices/userSlice";
type Chat = {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
};

const ChatList: React.FC = () => {
  const chats = useSelector((state: RootState) => state.chats.chats);
  const users = useSelector((state: RootState) => state.users.users);
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const activeChatId = useSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      let initialChats: any = await dispatch(fetchChats());
      await dispatch(fetchUsers());
      if (initialChats.payload.length) {
        dispatch(setActiveChat(initialChats.payload[0].id));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSelectChat = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  };

  const handleSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchQuery(event.target.value as string);
  };
  const getChatParticipantName = (chat: Chat): string => {
    const otherParticipantId = chat?.participants?.find(
      (id) => id !== loggedInUser.id
    );
    const otherParticipant = users?.find(
      (user) => user.id === otherParticipantId
    );
    return otherParticipant ? otherParticipant.name : "Unknown";
  };
  const handleCreateChat = async (selectedUser: {
    id: string;
    name: string;
    email: string;
  }) => {
    if (!loggedInUser) return;
    const participantIds = [loggedInUser.id, selectedUser.id].sort();
    const existingChat = chats?.find((chat) =>
      chat.participants.every((id) => participantIds.includes(id))
    );

    if (existingChat) {
      dispatch(setActiveChat(existingChat.id));
    } else {
      const newChat = {
        id: `${participantIds[0]}_${participantIds[1]}`,
        participants: participantIds,
        lastMessage: "",
      };
      await dispatch(createChat(newChat));
      dispatch(setActiveChat(newChat.id));
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        height: "calc(97vh-9vh)",
        overflow: "auto",
      }}
    >
      <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
        <Autocomplete
          options={users.filter((user) => user?.id !== loggedInUser?.id)}
          getOptionLabel={(option) => option.name}
          value={users.find((user) => user.name === searchQuery) || null}
          onChange={(event, newValue) => {
            if (newValue) {
              handleCreateChat(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search by name" fullWidth />
          )}
        />
      </FormControl>

      <List>
        {chats.length ? (
          chats.map((chat) => (
            <ListItem
              key={chat.id}
              button
              onClick={() => handleSelectChat(chat.id)}
              selected={chat.id === activeChatId}
              sx={{
                backgroundColor:
                  chat.id === activeChatId ? "#f0f0f0" : "transparent",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ListItemAvatar>
                <Avatar src={`https://i.pravatar.cc/40?img=${chat.id}`} />
              </ListItemAvatar>
              <ListItemText
                primary={getChatParticipantName(chat)}
                secondary={
                  <Typography variant="body2">{chat.lastMessage}</Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" sx={{ padding: 2 }}>
            Select a user to start chatting.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ChatList;
