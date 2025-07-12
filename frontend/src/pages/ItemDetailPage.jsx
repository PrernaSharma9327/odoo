// src/pages/ItemDetailPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = '6871eea824c694b65761a073'; // static for now

  useEffect(() => {
    axios.get(`${API_BASE}/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSwap = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/products/${id}/swap-request`);
      setMessage(res.data.message);
      setProduct(prev => ({ ...prev, status: 'swap' }));
    } catch (err) {
      setMessage(err.response?.data?.error || 'Swap failed.');
    }
  };

  const handleRedeem = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/products/${id}/redeem`, { userId });
      setMessage(res.data.message);
      setProduct(prev => ({ ...prev, status: 'redeemed' }));
    } catch (err) {
      setMessage(err.response?.data?.error || 'Redemption failed.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (!product) return <div className="text-center mt-10 text-red-600">Item not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
      <h1 className="text-3xl font-bold mb-4">Item Details</h1>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {product.images.length > 0 ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={`${API_BASE}/${img}`}
              onError={(e) => e.target.src = '/placeholder.png'}
              alt={`product-${index}`}
              className="rounded-lg border h-48 w-full object-cover"
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-2">No images available</p>
        )}
      </div>

      {/* Description */}
      <p className="text-lg mb-4"><strong>Description:</strong> {product.description}</p>

      {/* Status */}
      <p className="mb-4">
        <strong>Status:</strong>
        <span className={`ml-2 px-2 py-1 rounded-full text-white text-sm ${
          product.status === 'available' ? 'bg-green-600' :
          product.status === 'swap' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          {product.status}
        </span>
      </p>

      {/* Points */}
      <p className="mb-4"><strong>Points Required:</strong> {product.pointsRequired}</p>

      {/* Uploader Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Uploader Info</h2>
        <p><strong>Name:</strong> {product.uploader?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {product.uploader?.email || 'N/A'}</p>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={handleSwap}
          disabled={product.status !== 'available'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          title={product.status !== 'available' ? 'Action disabled for this item' : 'Request Swap'}
        >
          Swap Request
        </button>

        <button
          onClick={handleRedeem}
          disabled={product.status !== 'available'}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          title={product.status !== 'available' ? 'Action disabled for this item' : 'Redeem via Points'}
        >
          Redeem via Points
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mt-4 text-sm font-medium text-center ${
          message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
