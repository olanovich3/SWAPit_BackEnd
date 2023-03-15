const express = require("express");
const {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { upload } = require("../../middlewares/files.middleware");
const { isAuth } = require("../../middlewares/auth.middleware");
const ProductsRoutes = express.Router();

ProductsRoutes.get("/", getAllProducts);
ProductsRoutes.get("/:id", getProductByID);
ProductsRoutes.post("/", [isAuth], upload.single("images"), createProduct);
ProductsRoutes.patch("/:id", upload.single("images"), updateProduct);
ProductsRoutes.delete("/:id", deleteProduct);

module.exports = ProductsRoutes;
