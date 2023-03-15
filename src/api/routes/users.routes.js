const express = require("express");
const UsersRoutes = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers,
} = require("../controllers/users.controller");

const { upload } = require("../../middlewares/files.middleware");

UsersRoutes.get("/:id", getUserById);
UsersRoutes.get("/", getAllUsers);
UsersRoutes.post("/login", loginUser);
UsersRoutes.post("/logout", logoutUser);
UsersRoutes.post("/register", upload.single("image"), registerUser);
UsersRoutes.patch("/:id", upload.single("image"), updateUser);
UsersRoutes.delete("/:id", deleteUser);

module.exports = UsersRoutes;
