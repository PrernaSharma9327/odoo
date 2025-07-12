const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  images: [String],
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['available', 'swap', 'redeemed'],
    default: 'available',
    set: v => v.toLowerCase().trim()
  },
  pointsRequired: {
    type: Number,
    default: 100
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
