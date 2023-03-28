const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");

const {
  createRequest,
  HandleRequest,
  getAllRequest,
  deleteRequest,
} = require("../controllers/Request.controller");

const RequestRoutes = express.Router();

RequestRoutes.post("/:product", [isAuth], createRequest);
RequestRoutes.get("/", getAllRequest);
RequestRoutes.put("/:id", [isAuth], HandleRequest);
RequestRoutes.delete("/:id", deleteRequest);

module.exports = RequestRoutes;
