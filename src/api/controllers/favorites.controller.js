const Favorite = require("../models/favorite.model");
const User = require("../models/user.model");

const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find();
    return res.status(200).json(favorites);
  } catch (error) {
    return next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { product } = req.params;
    const newFavorite = new Favorite({
      user: req.user._id,
      product: product,
    });
    const createdFavorite = await newFavorite.save();
    await User.findByIdAndUpdate(req.user._id, {
      $push: { favorites: createdFavorite._id },
    });
    return res.status(201).json(createdFavorite);
  } catch (error) {
    return next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFavorite = await Favorite.findByIdAndDelete(id);
    await User.findByIdAndDelete(req.user._id, {
      favorites: deletedFavorite._id,
    });
    res.status(200).json(deletedFavorite);
  } catch (error) {
    return next(error);
  }
};

module.exports = { addFavorite, deleteFavorite, getAllFavorites };
