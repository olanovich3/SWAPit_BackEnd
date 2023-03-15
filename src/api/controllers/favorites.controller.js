const Favorite = require("../models/favorite.model");

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
    return res.status(201).json(createdFavorite);
  } catch (error) {
    return next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFavorite = await Favorite.findByIdAndDelete(id);
    res.status(200).json(deletedFavorite);
  } catch (error) {
    return next(error);
  }
};

module.exports = { addFavorite, deleteFavorite, getAllFavorites };
