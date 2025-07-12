const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path);
    const { description, status } = req.body;

    const newProduct = new Product({
      images: imagePaths,
      description,
      status
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
