import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.find().limit(limit).populate('category');
    res.json({ success: true, data: { products } });
  } catch (err) {
    next(err);
  }
});

export default router;
