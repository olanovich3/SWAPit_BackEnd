const express = require("express");
const UsersRoutes = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/users.controller");

UsersRoutes.get("/:id", getUserById);
UsersRoutes.post("/login", loginUser);
UsersRoutes.post("/logout", logoutUser);
UsersRoutes.post("/register", registerUser);
UsersRoutes.patch("/:id", updateUser);
UsersRoutes.delete("/:id", deleteUser);

module.exports = UsersRoutes;
