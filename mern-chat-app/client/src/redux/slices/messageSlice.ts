  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
  import api from "../../utils/api";
import { socket } from "../../webSocket/socket";


interface Message {
  id?: string
  senderId: string; 
  text: string; 
  chatId: string; 
  receiverName?: string;
  senderName?: string;
  timestamp?: string;
  status?:string;
}
  interface MessageState {
    messages: { [chatId: string]: Message[] };
  }

  const initialState: MessageState = {
    messages: {
      chat1: [
        {
          chatId: "chat1",
          senderId: "u1",
          text: "Hey there!",
        },
      ],
    },
  };
  export const sendMessageAsync = createAsyncThunk(
    "messages/sendMessageAsync",
    async (payload: { chatId: string; senderId: string; text: string }, { rejectWithValue }) => {
      
      try {
        const response = await api.post("/messages/sendMessage", payload);
        return response.data;  
      } catch (error) {
        return rejectWithValue({ message: "Failed to send message" });
      }
    }
  );
  
  export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async (chatId: string) => {
      const response = await api.get(`/messages/getMessages/${chatId}`);
      return { chatId, messages: response.data };
    }
  );
  const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
      sendMessage(
        state,
        action: PayloadAction<{ chatId: string; senderId: string; text: string }>
      ) {
        const { chatId, senderId, text } = action.payload;
        const newMessage: Message = {
          id: `msg_${Date.now()}`,
          chatId,
          senderId,
          text,
          timestamp: new Date().toLocaleTimeString(),
          status: "sent",
        };

        if (!state.messages[chatId]) {
          state.messages[chatId] = [];
        }
        state.messages[chatId].push(newMessage);
      },
      receiveMessage(state, action: PayloadAction<Message>) {
        const message = action.payload;
        if (!state.messages[message.chatId]) {
          state.messages[message.chatId] = [];
        }
        state.messages[message.chatId].push(message);
      },
    
    },
    extraReducers: (builder) => {
      builder.addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages[action.payload.chatId] = action.payload.messages;
      });
      builder
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        const updatedMessage = action.payload;
       
        socket.emit("sendMessage", updatedMessage);
      })
      
    },
  });

  export const { sendMessage,receiveMessage } = messageSlice.actions;
  export default messageSlice.reducer;
