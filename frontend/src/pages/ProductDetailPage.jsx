// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const ProductDetailPage = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('available');
  const [pointsRequired, setPointsRequired] = useState('');
  const [files, setFiles] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const uploaderId = '6871e5ebc4e709001b97549b';

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products`);
      setProducts(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('status', status);
    formData.append('pointsRequired', pointsRequired);
    formData.append('uploader', uploaderId);

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      await axios.post(`${API_BASE}/api/products/add`, formData);
      setDescription('');
      setStatus('available');
      setPointsRequired('');
      setFiles([]);
      setMessage('✅ Product added!');
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error adding product.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white shadow-lg mt-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Product Detail Page</h2>

      {/* Top Grid */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-8 items-start mb-10"
      >
        {/* Image Upload */}
        <div className="border border-dashed border-gray-400 rounded-lg p-6 h-full flex flex-col justify-between">
          <label className="block mb-2 font-semibold text-lg">Add Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Right: Description, Points, Status */}
        <div className="border border-gray-300 rounded-lg p-6 h-full flex flex-col justify-between">
          <div>
            <label className="block font-medium text-lg mb-1">Add Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3"
              rows="5"
              required
            ></textarea>

            <input
              type="number"
              placeholder="Points Required"
              value={pointsRequired}
              onChange={(e) => setPointsRequired(e.target.value)}
              className="w-full mb-3 border px-3 py-2 rounded"
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded border"
            >
              <option value="available">Available</option>
              <option value="swap">Swap</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Status/Error Message */}
      {message && (
        <p className="text-center mb-6 text-red-600 font-medium">{message}</p>
      )}

      {/* Previous Listings Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Previous Listings:</h3>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🔄 Refresh Products
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                <img
                  src={`${API_BASE}/${product.images[0]}`}
                  alt="product"
                  className="h-40 w-full object-cover"
                />
                <div className="p-2">
                  <p className="font-semibold truncate">{product.description}</p>
                  <p className={`text-sm capitalize mt-1 ${
                    product.status === 'available' ? 'text-green-600' :
                    product.status === 'swap' ? 'text-yellow-600' : 'text-red-500'
                  }`}>
                    {product.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
