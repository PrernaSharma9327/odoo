const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  createProduct,
  getAllProducts,
  getProductById,
  swapRequest,
  redeemProduct
} = require('../controllers/productController');

// Create
router.post('/add', upload.array('images', 5), createProduct);

// List all
router.get('/', getAllProducts);

// 🔥 New: Get single product (with uploader info)
router.get('/:id', getProductById);

// 🔁 Swap
router.post('/:id/swap-request', swapRequest);

// 💰 Redeem
router.post('/:id/redeem', redeemProduct);

module.exports = router;
