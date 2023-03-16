const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    message: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
