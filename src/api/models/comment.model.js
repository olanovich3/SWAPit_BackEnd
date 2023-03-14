const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    comment: { type: String, require: true, trim: true },
    rating: { type: Number, require: true, enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
