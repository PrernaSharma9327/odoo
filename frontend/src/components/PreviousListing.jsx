import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function PreviousListings() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch

    const interval = setInterval(() => {
      fetchProducts();
    }, 5000); // Auto refresh every 5s

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Previous Listings</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">No products available</p>
        ) : (
          products.map((product) => (
            <Link to={`/item/${product._id}`} key={product._id}>
              <div className="rounded-lg border shadow-md hover:shadow-lg transition">
                <img
                  src={`${API_BASE}/${product.images[0]}`}
                  alt="product"
                  className="h-40 w-full object-cover rounded-t-lg"
                  onError={(e) => e.target.src = '/placeholder.png'}
                />
                <div className="p-2">
                  <p className="font-semibold truncate">{product.description}</p>
                  <p className={`text-sm capitalize mt-1 ${
                    product.status === 'available' ? 'text-green-600' :
                    product.status === 'swap' ? 'text-yellow-600' :
                    'text-red-500'
                  }`}>
                    {product.status}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={fetchProducts}
        disabled={isLoading}
        className="mx-auto mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 block disabled:opacity-50"
      >
        {isLoading ? 'Refreshing...' : 'Refresh Products'}
      </button>
    </div>
  );
}
