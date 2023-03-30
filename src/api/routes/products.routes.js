const express = require("express");
const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  addFavorites,
  deleteFavorite,
  getProductByCategory,
} = require("../controllers/products.controller");
const { upload } = require("../../middlewares/files.middleware");
const { isAuth } = require("../../middlewares/auth.middleware");
const ProductsRoutes = express.Router();

ProductsRoutes.get("/", getAllProducts);
ProductsRoutes.get("/:id", getProductByID);

ProductsRoutes.get("/categories/:category", getProductByCategory);
ProductsRoutes.put("/favorites/:id", [isAuth], addFavorites);
ProductsRoutes.patch("/favorites/:id", [isAuth], deleteFavorite);
ProductsRoutes.post(
  "/",
  [isAuth],
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createProduct
);
ProductsRoutes.patch(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateProduct
);
ProductsRoutes.delete("/:id", [isAuth], deleteProduct);

module.exports = ProductsRoutes;
