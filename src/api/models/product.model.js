const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    images: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    location: {
      type: String,
      required: false,
      trim: true,
      enum: ["madrid", "barcelona"],
    },
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
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
