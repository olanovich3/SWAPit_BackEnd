const express = require("express");
const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorites,
  deleteFavorite,
} = require("../controllers/products.controller");
const { upload } = require("../../middlewares/files.middleware");
const { isAuth } = require("../../middlewares/auth.middleware");
const ProductsRoutes = express.Router();

ProductsRoutes.get("/", getAllProducts);
ProductsRoutes.get("/:id", getProductByID);
ProductsRoutes.put("/favorites/:id", [isAuth], addFavorites);
ProductsRoutes.patch("/favorites/:id", [isAuth], deleteFavorite);
ProductsRoutes.post("/", [isAuth], upload.single("images"), createProduct);
ProductsRoutes.patch("/:id", upload.single("images"), updateProduct);
ProductsRoutes.delete("/:id", [isAuth], deleteProduct);

module.exports = ProductsRoutes;
