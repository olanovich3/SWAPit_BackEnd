const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image1: { type: String, required: false, trim: true },
    image2: { type: String, required: false, trim: true },
    image3: { type: String, required: false, trim: true },
    description: { type: String, required: false, trim: true },
    category: {
      type: String,
      required: false,
      trim: true,
      enum: [
        "movies, books & music",
        "videogames",
        "appliances",
        "electronic",
        "sports & leisure",
        "home",
        "other",
      ],
    },
    condition: {
      type: String,
      required: false,
      trim: true,
      enum: [
        "new",
        "as good as new",
        "good condition",
        "fair condition",
        "heas given it all",
      ],
    },
    status: {
      type: String,
      required: false,
      trim: true,
      enum: ["available", "reserved", "not available"],
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
