import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

const addReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const product = await Product.findById(productId);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  const review = await Review.create({ product: productId, user: req.user._id, rating, comment });
  product.reviews.push(review._id);
  // update rating average simple calc:
  const reviews = await Review.find({ product: productId });
  product.ratings = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2);
  await product.save();
  res.status(201).json(review);
});

export { addReview };
