import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  courier: String,
  trackingNumber: String,
  status: { type: String, enum: ["In Transit", "Delivered", "Returned"], default: "In Transit" },
  estimatedDelivery: Date,
}, { timestamps: true });

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
