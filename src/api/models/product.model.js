const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    images: [{ type: String, require: true, trim: true }],
    description: { type: String, require: true, trim: true },
    location: {
      type: String,
      require: true,
      trim: true,
      enum: ["madrid", "barcelona"],
    },
    category: {
      type: String,
      require: true,
      trim: true,
      enum: [
        "Moovies, Books & Music",
        "Videogames",
        "Appliances",
        "Electronic",
        "Sports & Leisure",
        "Home",
        "Other",
      ],
    },
    condition: {
      type: String,
      require: true,
      trim: true,
      enum: [
        "New",
        "As good as new",
        "Good condition",
        "Fair condition",
        "Has given it all",
      ],
    },
    status: {
      type: String,
      require: true,
      trim: true,
      enum: ["Available", "Reserved", "Not available"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
