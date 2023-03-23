const express = require("express");
const UsersRoutes = express.Router();
const { isAuth } = require("../../middlewares/auth.middleware");
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
UsersRoutes.post("/register", upload.single("avatar"), registerUser);
UsersRoutes.patch("/:id", [isAuth], upload.single("avatar"), updateUser);
UsersRoutes.delete("/:id", [isAuth], deleteUser);

module.exports = UsersRoutes;
