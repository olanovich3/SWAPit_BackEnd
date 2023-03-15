const Product = require("../models/product.model");
const User = require("../models/user.model");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      ...req.body,
      images: req.file ? req.file.path : "not found",
      owner: req.user._id,
    });

    const owner = req.user._id;
    const createdProduct = await newProduct.save();
    await User.findByIdAndUpdate(owner, {
      $push: { products: createdProduct },
    });

    return res.status(201).json(createdProduct);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newProduct = await Product(req.body);
    newProduct._id = id;
    const originalProduct = await Product.findById(id);
    if (req.file) {
      deleteImgCloudinary(originalProduct.images);
      newProduct.images = req.file.path;
    }
    await Product.findByIdAndUpdate(id, newProduct);
    return res.status(200).json({
      new: newProduct,
      old: originalProduct,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
