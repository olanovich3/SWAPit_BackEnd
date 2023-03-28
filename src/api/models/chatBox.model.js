const mongoose = require("mongoose");

const ChatBoxSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  },
  {
    timestamps: true,
  }
);

const ChatBox = mongoose.model("ChatBox", ChatBoxSchema);
module.exports = ChatBox;
