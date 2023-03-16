const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");

const {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
} = require("../controllers/favorites.controller");

const FavoritesRoutes = express.Router();

FavoritesRoutes.get("/", getAllFavorites);
FavoritesRoutes.post("/:product", [isAuth], addFavorite);
FavoritesRoutes.delete("/:id", [isAuth], deleteFavorite);

module.exports = FavoritesRoutes;
