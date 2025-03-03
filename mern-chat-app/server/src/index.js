const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/Chat");
const messageRoutes = require("./routes/message");

const Message = require("./models/Message");
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/chats", chatRoutes);

app.use("/api/messages", messageRoutes);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  socket.on(
    "sendMessage",
    async ({ chatId, senderId, text, recieverName, senderName }) => {
      try {
        const newMessage = new Message({
          chatId,
          senderId,
          text,
          timestamp: new Date(),
          status: "sent",
          recieverName,
          senderName,
        });

        io.emit("messageReceived", newMessage);

        io.emit("updateLastMessage", { chatId, lastMessage: text });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  );

  socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {});
