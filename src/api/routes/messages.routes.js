const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getAllMessages,
  deleteMessage,
  createMessage,
} = require("../controllers/messages.controller");

const MessagesRoutes = express.Router();

MessagesRoutes.get("/", getAllMessages);
MessagesRoutes.post("/:product", [isAuth], createMessage);
MessagesRoutes.delete("/:id", deleteMessage);

module.exports = MessagesRoutes;
