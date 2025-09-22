import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reportType: { type: String, enum: ["user", "product"], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reason: { type: String },
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
export default Report;
