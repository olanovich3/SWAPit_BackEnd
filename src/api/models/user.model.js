const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    birthdate: { type: Date, required: true, trim: true },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: { type: String, required: false, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword, "Password not valid"],
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    rating: [{ type: Number, default: 0 }],
    chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatBox" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
