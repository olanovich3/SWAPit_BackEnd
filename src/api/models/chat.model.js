const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    chat: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
