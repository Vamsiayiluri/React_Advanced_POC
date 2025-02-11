import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface Chat {
    id: string;
    participants: string[]; 
    lastMessage: string;
    updatedAt: string;
  }
  
  interface ChatState {
    chats: Chat[];
    activeChatId: string | null;
  }

const initialState: ChatState = {
  chats: [
    
  ],
  activeChatId: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  const response = await api.get("/chats/getAllChats");
  return response.data;
});
export const createChat = createAsyncThunk( 
  "chats/createChat",
  async (newChat: { id: string; participants: string[]; lastMessage: string }) => {
    debugger
    console.log('try hitting')
    const response = await api.post("/chats/createChat", newChat);
    return response.data;
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      debugger
      state.activeChatId = action.payload;
    },
    updateLastMessage(state, action: PayloadAction<{ chatId: string; message: string }>) {
      const chat = state.chats?.find((chat) => chat.id === action.payload.chatId);
      if (chat) {
        chat.lastMessage = action.payload.message;
        chat.updatedAt = new Date().toLocaleTimeString();
      }
    },
    addChat(state, action: PayloadAction<Chat>) {
      debugger
        state.chats.push(action.payload);
      },
      
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      console.log(action.payload,'check')
      state.chats.push(action.payload);
    });
  },
});

export const { setActiveChat, updateLastMessage,addChat } = chatSlice.actions;
export default chatSlice.reducer;
