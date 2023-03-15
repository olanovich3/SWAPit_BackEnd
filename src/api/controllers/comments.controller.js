const Comment = require("../models/comment.model");

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { product } = req.params;
    const { id } = req.params;
    const comment = req.body.comment;

    const newComment = new Comment({
      userfrom: req.user._id,
      userto: id,
      product: product,
      comment: comment,
    });
    const createdComment = await newComment.save();
    return res.status(201).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
