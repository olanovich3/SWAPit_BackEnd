const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    lastname: { type: String, require: true, trim: true },
    gender: {
      type: String,
      require: true,
      trim: true,
      enum: ["female", "male"],
    },
    birthdate: { type: Date, require: true, trim: true },
    location: {
      type: String,
      require: true,
      trim: true,
      enum: ["madrid", "barcelona"],
    },
    email: {
      type: String,
      require: true,
      trim: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    password: {
      type: String,
      require: true,
      trim: true,
      validate: [validator.isStrongPassword, "Password not valid"],
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
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
