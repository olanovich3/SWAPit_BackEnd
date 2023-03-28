const mongoose = require("mongoose");

const SolicitudSchema = new mongoose.Schema(
  {
    userfrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    message: { type: String, required: false, trim: true },
    status: {
      type: String,
      required: false,
      default: "pending",
      trim: true,
      enum: ["pending", "accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

const Solicitud = mongoose.model("Solicitud", SolicitudSchema);
module.exports = Solicitud;
