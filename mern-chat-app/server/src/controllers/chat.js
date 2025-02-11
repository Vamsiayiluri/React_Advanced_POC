const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChat = async (req, res) => {
  try {
    const { participants, lastMessage, id } = req.body;
    console.log(participants, lastMessage, id, "participants, lastMessage, id");

    if (participants.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two participants are required." });
    }

    const existingChat = await Chat.findOne({
      participants: { $all: participants },
    });
    console.log(existingChat, "existingChat");

    if (existingChat) {
      return res
        .status(200)
        .json({ message: "Chat already exists", chat: existingChat });
    }

    const chat = new Chat({
      id: id || "",
      participants,
      lastMessage: lastMessage || "No messages yet",
      updatedAt: Date.now(),
    });
    console.log(chat, "chat");

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const { id } = req.user;

    const chats = await Chat?.find({
      participants: id,
    })
      .populate("participants", "name email avatar")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId)
      .populate("participants", "name email avatar")
      .populate("messages");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
