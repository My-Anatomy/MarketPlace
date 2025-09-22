import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;
  const m = await Message.create({ sender: req.user._id, receiver: receiverId, message });
  res.status(201).json(m);
});

const getConversation = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const msgs = await Message.find({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id }
    ]
  }).sort({ createdAt: 1 });
  res.json(msgs);
});

export { sendMessage, getConversation };
