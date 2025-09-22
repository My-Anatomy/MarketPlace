import asyncHandler from "express-async-handler";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

const webhookPaymentComplete = asyncHandler(async (req, res) => {
  // hook for payment gateway to call. Minimal stub:
  const { orderId, transactionId, status } = req.body;
  const payment = await Payment.findOne({ order: orderId });
  if (!payment) {
    res.status(404); throw new Error("Payment not found");
  }
  payment.transactionId = transactionId;
  payment.status = status;
  await payment.save();
  if (status === "Completed") {
    const order = await Order.findById(orderId);
    order.paymentStatus = "Paid";
    await order.save();
  }
  res.json({ ok: true });
});

export { webhookPaymentComplete };
