import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Payment from "../models/Payment.js";

const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, couponCode } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }
  const total = cart.items.reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.price })),
    totalAmount: total,
    shippingAddress,
    paymentStatus: "Pending",
    orderStatus: "Processing"
  });
  // create payment placeholder
  await Payment.create({ order: order._id, user: req.user._id, amount: total, paymentMethod, status: "Pending" });
  // clear cart
  cart.items = []; cart.totalPrice = 0; await cart.save();
  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export { createOrder, getMyOrders };
