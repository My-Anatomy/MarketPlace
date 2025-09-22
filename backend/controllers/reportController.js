import asyncHandler from "express-async-handler";
import Report from "../models/Report.js";

const createReport = asyncHandler(async (req, res) => {
  const { reportType, targetId, reason } = req.body;
  const r = await Report.create({ reportType, targetId, reason, createdBy: req.user._id });
  res.status(201).json(r);
});

const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

const resolveReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) { res.status(404); throw new Error("Report not found"); }
  report.status = "Resolved";
  await report.save();
  res.json(report);
});

export { createReport, getReports, resolveReport };
