import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [String],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stock: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
