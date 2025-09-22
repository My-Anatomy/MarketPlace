import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getUsers, blockUser, getProducts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, admin, getUsers);
router.put("/users/:id/block", protect, admin, blockUser);
router.get("/products", protect, admin, getProducts);

export default router;
