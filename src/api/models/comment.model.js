const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: { type: String, required: false, trim: true },
    rating: { type: Number, required: true, enum: [0, 1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
