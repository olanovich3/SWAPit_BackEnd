const Chat = require("../models/chat.model");
const Product = require("../models/product.model");

const getChatsByUser = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      $or: [{ userto: req.user._id }, { userfrom: req.user._id }],
    }).populate("userfrom userto");
    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

const createChat = async (req, res, next) => {
  try {
    const { product } = req.params;
    const chatProduct = await Product.findById(product);
    const userfrom = req.user._id;
    const owner =
      chatProduct.owner === userfrom ? chatProduct.userto : chatProduct.owner;
    const newChat = new Chat({
      userfrom,
      userto: owner,
      chat: req.body.chat,
    });

    const createdChat = await newChat.save();
    await Product.findByIdAndUpdate(
      product,
      {
        $push: { chat: createdChat._id },
      },
      { new: true }
    );
    return res.status(201).json(createdChat);
  } catch (error) {
    return next(error);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    res.status(200).json(deletedChat);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createChat,
  deleteChat,
  getChatsByUser,
};
