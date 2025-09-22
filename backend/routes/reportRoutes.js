import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createReport, getReports, resolveReport } from "../controllers/reportController.js";
import { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);
router.get("/", protect, admin, getReports);
router.put("/:id/resolve", protect, admin, resolveReport);

export default router;
