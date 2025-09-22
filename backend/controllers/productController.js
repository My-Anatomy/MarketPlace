import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// Create product (seller)
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, stock, images } = req.body;
  const product = new Product({ title, description, price, category, stock, images, seller: req.user._id });
  const created = await product.save();
  res.status(201).json(created);
});

// Get products with basic filters
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const keyword = req.query.keyword ? { title: { $regex: req.query.keyword, $options: "i" } } : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const filter = { ...keyword, ...category, isApproved: true };
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  res.json({ products, page, pages: Math.ceil(total / limit), total });
});

// Get single product
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller", "name email");
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (String(product.seller) !== String(req.user._id) && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to update");
  }
  const { title, description, price, stock, images, category } = req.body;
  product.title = title ?? product.title;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.stock = stock ?? product.stock;
  product.images = images ?? product.images;
  product.category = category ?? product.category;
  const updated = await product.save();
  res.json(updated);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (String(product.seller) !== String(req.user._id) && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to delete");
  }
  await product.remove();
  res.json({ message: "Product removed" });
});

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
