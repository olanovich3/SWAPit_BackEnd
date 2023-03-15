const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
