import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "flat"], default: "percentage" },
  discountValue: Number,
  validFrom: Date,
  validTo: Date,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
