const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  deleteChat,
  createChat,
  getChatsByUser,
} = require("../controllers/chats.controller");

const ChatsRoutes = express.Router();

ChatsRoutes.post("/:chatBox", [isAuth], createChat);
ChatsRoutes.get("/", [isAuth], getChatsByUser);
ChatsRoutes.delete("/:id", deleteChat);

module.exports = ChatsRoutes;
