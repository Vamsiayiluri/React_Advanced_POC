const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    chatId: { type: String, required: true },
    recieverName: { type: String, required: true },
    senderName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
