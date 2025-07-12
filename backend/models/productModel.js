// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  images: [String],

  description: {
    type: String,
    required: true,
    trim: true           // removes accidental leading/trailing spaces
  },

  status: {
    type: String,
    enum: ['available', 'swap'],
    required: true,
    set: v => v.toLowerCase().trim()   // ⇢ transforms “Available ” → “available”
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
