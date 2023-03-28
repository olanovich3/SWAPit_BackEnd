const Chat = require("../models/chat.model");
const ChatBox = require("../models/chatBox.model");

// Controlador para obtener la caja de chat correspondiente a un usuario logueado
const getChatBoxForUser = async (req, res, next) => {
  const userId = req.user._id; // Id del usuario logueado

  try {
    // Buscamos la caja de chat que tenga como usuario1 o usuario2 al usuario logueado
    const chatBox = await ChatBox.findOne({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "_id name") // Populamos la información del usuario1
      .populate("user2", "_id name") // Populamos la información del usuario2
      .populate({
        path: "chat",
        populate: { path: "user", select: "_id name" }, // Populamos los usuarios de los mensajes
      });

    if (!chatBox) {
      return res.status(404).json({ error: "No se encontró el chat" });
    }

    // Verificamos si el usuario logueado es el usuario1 o el usuario2 y devolvemos la información correspondiente
    if (chatBox.user1._id.toString() === userId.toString()) {
      return res.json({
        chatBoxId: chatBox._id,
        user: chatBox.user1,
        otherUser: chatBox.user2,
        chat: chatBox.chat,
      });
    } else {
      return res.json({
        chatBoxId: chatBox._id,
        user: chatBox.user2,
        otherUser: chatBox.user1,
        chat: chatBox.chat,
      });
    }
  } catch (error) {
    return next(error);
  }
};

// Controlador para crear una nueva caja de chat
const createChatBox = async (req, res, next) => {
  const { user2 } = req.body; // Id del usuario con el que se quiere iniciar una conversación

  // Verificamos que el usuario2 esté definido
  if (!user2) {
    return res.status(400).json({ error: "El id del usuario2 es requerido" });
  }

  try {
    const userId = req.user._id; // Id del usuario logueado

    // Verificamos si ya existe una caja de chat entre los dos usuarios
    const existingChatBox = await ChatBox.findOne({
      $or: [
        { user1: userId, user2: user2 },
        { user1: user2, user2: userId },
      ],
    });

    if (existingChatBox) {
      return res.status(409).json({
        error: "Ya existe una caja de chat con este usuario",
        chatBoxId: existingChatBox._id,
      });
    }

    // Creamos una nueva caja de chat
    const newChatBox = new ChatBox({ user1: userId, user2: user2 });
    await newChatBox.save();

    return res.json({
      message: "Caja de chat creada exitosamente",
      chatBoxId: newChatBox._id,
    });
  } catch (error) {
    return next(error);
  }
};

const updateChatBox = async (chatboxId, chatId) => {
  try {
    const chatbox = await ChatBox.findById(chatboxId).populate("chat");
    const chat = await Chat.findById(chatId);

    if (!chatbox || !chat) {
      return;
    }

    const chatIndex = chatbox.chat.findIndex((c) => c._id.equals(chatId));

    if (chatIndex < 0) {
      return;
    }

    const newChatbox = {
      ...chatbox._doc,
      chat: [
        ...chatbox.chat.slice(0, chatIndex),
        chat,
        ...chatbox.chat.slice(chatIndex + 1),
      ],
    };
    await chatbox.user1.findByIdAndUpdate(chatbox.user1, {
      $set: { chatbox: newChatbox },
    });
    await chatbox.user2.findByIdAndUpdate(chatbox.user2, {
      $set: { chatbox: newChatbox },
    });
  } catch (error) {
    console.error(error);
  }
};

// Controlador para eliminar una caja de chat
const deleteChatBox = async (req, res, next) => {
  const chatBoxId = req.params.id; // Id de la caja de chat a eliminar

  try {
    // Buscamos la caja de chat en la base de datos
    const chatBox = await ChatBox.findById(chatBoxId);

    // Si la caja de chat no existe, devolvemos un error
    if (!chatBox) {
      return res.status(404).json({ error: "La caja de chat no existe" });
    }

    // Verificamos que el usuario logueado sea uno de los usuarios de la caja de chat

    if (
      chatBox.user1.toString() !== req.user._id.toString() &&
      chatBox.user2.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ error: "No estás autorizado para eliminar esta caja de chat" });
    }

    // Eliminamos la caja de chat de la base de datos
    await chatBox.remove();

    return res.json({ message: "Caja de chat eliminada exitosamente" });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getChatBoxForUser,
  createChatBox,
  deleteChatBox,
  updateChatBox,
};
