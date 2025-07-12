const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productRoutes = require('./routes/productRoutes');
const path = require('path');

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/odooDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// Start server
app.listen(5000, () => console.log('🚀 Server started on http://localhost:5000'));
