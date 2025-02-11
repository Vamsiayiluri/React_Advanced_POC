const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    participants: [
      {
        type: String,
        required: true,
      },
    ],
    lastMessage: { type: String, default: "" },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ChatSchema.index({ participants: 1 }, { unique: true });

module.exports = mongoose.model("Chat", ChatSchema);
