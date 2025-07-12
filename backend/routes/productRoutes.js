const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { createProduct, getAllProducts } = require('../controllers/productController');

// Add new product
router.post('/add', upload.array('images', 5), createProduct);

// Get previous listings
router.get('/all', getAllProducts);
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  const products = await Product.find({ description: { $regex: keyword, $options: 'i' } });
  res.json(products);
});

module.exports = router;
