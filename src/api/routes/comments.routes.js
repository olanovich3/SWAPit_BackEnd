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
CommentsRoutes.post("/", [isAuth], createComment);
CommentsRoutes.patch("/", updateComment);
CommentsRoutes.delete("/", deleteComment);

module.exports = CommentsRoutes;
