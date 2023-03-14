const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
