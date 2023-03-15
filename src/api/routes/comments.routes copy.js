const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments.controller");

const CommentsRoutes = express.Router();

CommentsRoutes.get("/", getAllComments);
CommentsRoutes.post("/:product", [isAuth], createComment);
CommentsRoutes.patch("/", updateComment);
CommentsRoutes.delete("/:id", deleteComment);

module.exports = CommentsRoutes;