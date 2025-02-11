const Message = require("../models/Message");
const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
  try {
    const { text, chatId, recieverName, senderName } = req.body;
    const { user } = req;

    const chat = await Chat.findOne({ id: chatId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const message = new Message({
      senderId: user.id,
      text,
      chatId,
      recieverName,
      senderName,
    });

    await message.save();

    chat.lastMessage = text;
    chat.updatedAt = Date.now();
    await chat.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message?.find({ chatId })
      .sort({ createdAt: 1 })
      .populate("senderId", "name email avatar");

    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
