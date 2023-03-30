const Request = require("../models/Request.model");
const Product = require("../models/product.model");

const getAllRequest = async (req, res, next) => {
  try {
    const request = await Request.find().populate("userfrom userto product");
    return res.status(200).json(request);
  } catch (error) {
    return next(error);
  }
};

const createRequest = async (req, res, next) => {
  try {
    const { product } = req.params;
    const solicitedProduc = await Product.findById(product);

    const newRequest = new Request({
      userfrom: req.user._id,
      userto: solicitedProduc.owner._id,
      product: product,
      message: req.body.message,
    });
    const createdRequest = await newRequest.save();
    return res.status(200).json(createdRequest);
  } catch (error) {
    return next(error);
  }
};

const HandleRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    return res.status(200).json(updatedRequest);
  } catch (error) {
    return next(error);
  }
};
const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRequest = await Request.findByIdAndDelete(id);

    res.status(200).json(deletedRequest);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createRequest,
  HandleRequest,
  getAllRequest,
  deleteRequest,
};
