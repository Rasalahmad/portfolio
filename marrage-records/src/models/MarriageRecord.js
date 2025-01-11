import mongoose from "mongoose";

const MarriageRecordSchema = new mongoose.Schema({
  wifeName: { type: String, required: true },
  husbandName: { type: String, required: true },
  dateOfMarriage: { type: Date, required: true },
  pageNo: { type: Number, required: true },
  balamNo: { type: Number, required: true },
});

export default mongoose.models.MarriageRecord ||
  mongoose.model("MarriageRecord", MarriageRecordSchema);
