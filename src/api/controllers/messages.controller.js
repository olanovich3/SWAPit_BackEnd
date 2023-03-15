const Message = require("../models/message.model");

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
    const newMessage = new Message(req.body);
    const createdMessage = await newMessage.save();
    return res.status(201).json(createdMessage);
  } catch (error) {
    return next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedMessage);
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
  updateMessage,
  deleteMessage,
};
