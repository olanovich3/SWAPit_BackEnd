const Product = require("../models/product.model");
const User = require("../models/user.model");
const { deleteImgCloudinary } = require("../../middlewares/files.middleware");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("owner users");
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("owner users");
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category }).populate(
      "owner users"
    );
    if (products == null) {
      return res.status(404).json("not products found on category");
    } else {
      return res.status(200).json(products);
    }
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      ...req.body,
      image1: req.files.image1 ? req.files.image1[0].path : null,
      image2: req.files.image2 ? req.files.image2[0].path : null,
      image3: req.files.image3 ? req.files.image3[0].path : null,
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
    if (req.files.image1) {
      deleteImgCloudinary(originalProduct.image1);
      newProduct.image1 = req.files.image1[0].path;
    } else {
      newProduct.image1 = originalProduct.image1;
    }
    if (req.files.image2) {
      deleteImgCloudinary(originalProduct.image2);
      newProduct.image2 = req.files.image2[0].path;
    } else {
      newProduct.image2 = originalProduct.image2;
    }
    if (req.files.image3) {
      deleteImgCloudinary(originalProduct.image3);
      newProduct.image3 = req.files.image3[0].path;
    } else {
      newProduct.image3 = originalProduct.image3;
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
const addFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    const user = await User.findById(req.user._id);
    if (!product.users.includes(req.user._id)) {
      const favoriteProduct = await Product.findByIdAndUpdate(
        id,
        {
          $push: { users: user },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user,
        {
          $push: { favorites: id },
        },
        { new: true }
      );
      res.status(200).json({
        user: user,
        product: favoriteProduct,
      });
    } else {
      return next("favorite already exists");
    }
  } catch (error) {
    return next(error);
  }
};
const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { favorites: product._id },
      },
      { new: true }
    );
    const favorite = await Product.findByIdAndUpdate(
      id,
      {
        $pull: { users: req.user._id },
      },
      { new: true }
    );

    return res.status(200).json({ user: user, product: favorite });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    const user = await User.findById(req.user._id);
    await user.products.pull(id); // Elimina el elemento con el id especificado de la matriz 'favorites'
    await user.save();
    res.status(200).json(user);
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
  addFavorites,
  deleteFavorite,
  getProductByCategory,
};
