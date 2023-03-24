const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");
const Product = require("../models/product.model");

const registerUser = async (req, res, next) => {
  try {
    const newUSer = new User({
      ...req.body,
      avatar: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dnkacmdmh/image/upload/v1679438534/usuario_ow1wp1.png",
    });
    const userExists = await User.findOne({ email: newUSer.email });

    if (userExists) {
      return next("User already exists");
    }
    const createdUser = await newUSer.save();
    createdUser.password = null;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next("User not found");
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json({ token, user: createdUser });
    }
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("comments products favorites");
    return res.status(200).json(allUsers);
  } catch (error) {
    return next("not user found", error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next("User not found");
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    return next("User cannot login", error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Product.deleteMany({ owner: id });

    await User.findByIdAndDelete(id);

    return res.status(200).json("user deleted");
  } catch (error) {
    return next("Error deleting user", error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id).populate(
      "comments products favorites"
    );
    return res.status(200).json(getUser);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = await User(req.body);
    const originalUser = await User.findById(id);
    newUser._id = id;
    if (req.body.password) {
      newUser.password = await bcrypt.hash(req.body.password, 10);
    } else {
      newUser.password = originalUser.password;
    }

    if (req.file) {
      deleteImgCloudinary(originalUser.avatar);
      newUser.avatar = req.file.path;
    }
    newUser.products = originalUser.products;
    await User.findByIdAndUpdate(id, newUser);
    return res.status(200).json({
      new: newUser,
      old: originalUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers,
};
