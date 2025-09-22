<<<<<<< HEAD
import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
  name: String,
  icon: String
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;
=======
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
>>>>>>> 3fcda6997b15f97c2aa297294d3841508fca9b44
