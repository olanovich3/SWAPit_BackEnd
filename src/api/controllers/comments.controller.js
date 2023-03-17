const Comment = require("../models/comment.model");
const Product = require(`../models/product.model`);
const User = require(`../models/user.model`);

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
    const comment = req.body.comment;
    const commentProduct = await Product.findById(product);
    const owner = commentProduct.owner;
    const newComment = new Comment({
      userfrom: req.user._id,
      userto: owner,
      product: product,
      comment: comment,
    });

    const createdComment = await newComment.save();
    await User.findByIdAndUpdate(
      owner,
      {
        $push: { comments: createdComment._id },
      },
      { new: true }
    );
    return res.status(201).json(createdComment);
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
  deleteComment,
};
