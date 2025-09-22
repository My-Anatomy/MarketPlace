import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object,
}, { timestamps: true });

const AnalyticsLog = mongoose.model("AnalyticsLog", analyticsSchema);
export default AnalyticsLog;
