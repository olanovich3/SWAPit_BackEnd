const Message = require("../models/message.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { product } = req.params;
    const chatProduct = await Product.findById(product);
    const owner = chatProduct.owner;
    const newMessage = new Message({
      userfrom: req.user._id,
      userto: owner,
      message: req.body.message,
    });

    const createdMessage = await newMessage.save();
    await User.findByIdAndUpdate(
      owner,
      {
        $push: { chat: createdMessage._id },
      },
      { new: true }
    );
    const returnmessage = Message.findById(createdMessage);
    console.log(returnmessage);
    return res.status(201).json(createdMessage);
  } catch (error) {
    return next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedmessage = await Message.findByIdAndDelete(id);
    res.status(200).json(deletedmessage);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
};
