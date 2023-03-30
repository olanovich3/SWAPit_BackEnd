const mongoose = require("mongoose");

const SolicitudSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    status: {
      type: String,
      required: false,
      default: "pending",
      trim: true,
      enum: ["pending", "accepted", "rejected"],
    },
    message: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Solicitud = mongoose.model("Solicitud", SolicitudSchema);
module.exports = Solicitud;
