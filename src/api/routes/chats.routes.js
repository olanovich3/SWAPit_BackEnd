const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getAllChats,
  deleteChat,
  createChat,
} = require("../controllers/chats.controller");

const ChatsRoutes = express.Router();

ChatsRoutes.get("/", getAllChats);
ChatsRoutes.post("/:product", [isAuth], createChat);
ChatsRoutes.delete("/:id", deleteChat);

module.exports = ChatsRoutes;
