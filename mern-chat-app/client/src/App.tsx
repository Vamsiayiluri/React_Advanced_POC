import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./components/Homepage";
import ChatPage from "./components/ChatPage";
import { useDispatch } from "react-redux";
import { connectSocket, disconnectSocket, socket } from "./webSocket/socket";
import { receiveMessage } from "./redux/slices/messageSlice";
import { updateLastMessage } from "./redux/slices/chatSlice";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    connectSocket();
    socket.on("messageReceived", (message) => {
      dispatch(receiveMessage(message));
    });
    socket.on("updateLastMessage", ({ chatId, lastMessage }) => {
      dispatch(updateLastMessage({ chatId, message: lastMessage }));
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chat"
            element={<PrivateRoute element={<ChatPage />} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
