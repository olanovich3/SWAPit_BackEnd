const express = require("express");
const UsersRoutes = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers
} = require("../controllers/users.controller");

UsersRoutes.get("/:id", getUserById);
UsersRoutes.get("/", getAllUsers);
UsersRoutes.post("/login", loginUser);
UsersRoutes.post("/logout", logoutUser);
UsersRoutes.post("/register", registerUser);
UsersRoutes.patch("/:id", updateUser);
UsersRoutes.delete("/:id", deleteUser);

module.exports = UsersRoutes;
