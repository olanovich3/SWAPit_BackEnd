const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getAllComments,
  createComment,

  deleteComment,
} = require("../controllers/comments.controller");

const CommentsRoutes = express.Router();

CommentsRoutes.get("/", getAllComments);
CommentsRoutes.post("/:product", [isAuth], createComment);
CommentsRoutes.delete("/:id", deleteComment);

module.exports = CommentsRoutes;
