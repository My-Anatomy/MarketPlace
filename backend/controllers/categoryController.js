import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, description, parentCategory } = req.body;
  const existing = await Category.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Category exists");
  }
  const c = await Category.create({ name, description, parentCategory });
  res.status(201).json(c);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

export { createCategory, getCategories };
