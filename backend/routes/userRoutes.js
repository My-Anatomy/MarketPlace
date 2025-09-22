import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", protect, asyncHandler(async (req, res) => {
  res.json(req.user);
}));

router.put("/profile", protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found'); }
  const { name, phone, address } = req.body;
  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.address = address ?? user.address;
  await user.save();
  res.json(user);
}));

export default router;
