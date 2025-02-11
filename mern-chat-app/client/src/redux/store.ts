import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import messageReducer from "./slices/messageSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";


export const store = configureStore({
  reducer: {
    chats: chatReducer,
    messages: messageReducer,
    users: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
