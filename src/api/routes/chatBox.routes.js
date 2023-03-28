const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getChatBoxForUser,
  createChatBox,
  deleteChatBox,
  updateChatBox,
} = require("../controllers/chatBox.controller");

const ChatBoxRoutes = express.Router();

ChatBoxRoutes.post("/", [isAuth], createChatBox);
ChatBoxRoutes.get("/:id", [isAuth], getChatBoxForUser);
ChatBoxRoutes.delete("/:id", deleteChatBox);
ChatBoxRoutes.patch("/:id", [isAuth], updateChatBox);

module.exports = ChatBoxRoutes;
