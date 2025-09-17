import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
