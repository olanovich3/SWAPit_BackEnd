const express = require("express");

const {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
} = require("../controllers/favorites.controller");

const CommentsRoutes = express.Router();

CommentsRoutes.get("/", getAllFavorites);
CommentsRoutes.post("/", addFavorite);
CommentsRoutes.delete("/:id", deleteFavorite);

module.exports = CommentsRoutes;
