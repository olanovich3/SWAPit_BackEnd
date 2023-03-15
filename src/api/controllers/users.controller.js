const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/token");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");

const registerUser = async (req, res, next) => {
  try {
    const newUSer = new User({
      ...req.body,
      image: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dlvbfzkt9/image/upload/v1678116548/Resources/jh3tdhrmyrr0kulwykgl.png",
    });
    const userExists = await User.findOne({ email: newUSer.email });
    if (userExists) {
      return next("User already exists");
    }
    const createdUser = await newUSer.save();
    createdUser.password = null;
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
  return res.status(200).json(allUsers)
  } catch (error) {
    return next ('not user found', error)
  }
  
}

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next("User not found");
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json(token);
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
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return next("Error deleting user", error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    return res.status(200).json(getUser);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = await User(req.body);
    newUser._id = id;
    const originalUser = await User.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalUser.image);
      newUser.image = req.file.path;
    }
    await User.findByIdAndUpdate(id, newUser);
    return res.status(200).json(newUser);
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
  getAllUsers
};
