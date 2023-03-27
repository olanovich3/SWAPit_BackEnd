const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getAllCommentsOwner,
  createComment,
  getCommentsByUser,
  deleteComment,
} = require("../controllers/comments.controller");

const CommentsRoutes = express.Router();

CommentsRoutes.get("/:product", getAllCommentsOwner);
CommentsRoutes.get("/:id", [isAuth], getCommentsByUser);
CommentsRoutes.post("/:product", [isAuth], createComment);
CommentsRoutes.delete("/:id", deleteComment);

module.exports = CommentsRoutes;
