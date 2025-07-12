const Product = require('../models/productModel');
const User = require('../models/userModel');

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { description, status, pointsRequired, uploader } = req.body;
    const imagePaths = req.files.map(file => file.path.replace(/\\/g, '/'));

    const product = new Product({
      images: imagePaths,
      description,
      status,
      pointsRequired,
      uploader
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID with uploader
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('uploader');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Swap request
exports.swapRequest = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.status !== 'available') {
      return res.status(400).json({ error: 'Item not available for swap' });
    }

    product.status = 'swap';
    await product.save();
    res.json({ message: '✅ Swap request placed', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Redeem item
exports.redeemProduct = async (req, res) => {
  const { userId } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.status !== 'available') {
      return res.status(400).json({ error: 'Item not available for redemption' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.points < product.pointsRequired) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    user.points -= product.pointsRequired;
    product.status = 'redeemed';

    await user.save();
    await product.save();

    res.json({ message: '✅ Redeemed successfully', userPoints: user.points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
