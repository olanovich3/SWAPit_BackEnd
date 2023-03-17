const Chat = require("../models/chat.model");
const Product = require("../models/product.model");

const getAllChats = async (req, res, next) => {
  try {
    const Chats = await Chat.find();
    return res.status(200).json(Chats);
  } catch (error) {
    return next(error);
  }
};

const createChat = async (req, res, next) => {
  try {
    const { product } = req.params;
    const chatProduct = await Product.findById(product);
    const owner = chatProduct.owner;
    const newChat = new Chat({
      userfrom: req.user._id,
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
  getAllChats,
  createChat,
  deleteChat,
};
