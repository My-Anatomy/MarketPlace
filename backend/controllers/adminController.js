import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  user.isActive = !user.isActive;
  await user.save();
  res.json({ _id: user._id, isActive: user.isActive });
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('seller', 'name email').sort({ createdAt: -1 });
  res.json(products);
});

export { getUsers, blockUser, getProducts };
