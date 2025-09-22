import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
  } else {
    const idx = cart.items.findIndex(i => String(i.product) === String(productId));
    if (idx > -1) cart.items[idx].quantity += quantity;
    else cart.items.push({ product: productId, quantity });
  }
  // recalc price
  await cart.populate("items.product");
  cart.totalPrice = cart.items.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
  await cart.save();
  res.json(cart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }
  cart.items = cart.items.filter(i => String(i.product) !== String(productId));
  await cart.populate("items.product");
  cart.totalPrice = cart.items.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
  await cart.save();
  res.json(cart);
});

export { getCart, addToCart, removeFromCart };
