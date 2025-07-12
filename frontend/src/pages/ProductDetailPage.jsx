// src/pages/ProductDetailPage.jsx
import { useState } from "react";
import PreviousListings from "../components/PreviousListing";

export default function ProductDetailPage() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("status", status);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      alert("✅ Product uploaded successfully!");
      console.log(data);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="text-center text-2xl font-semibold mb-6">🛍️ Product Detail Page</div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
        
        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="font-medium mb-2">Add Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-4">
            {previews.map((src, i) => (
              <img key={i} src={src} alt="preview" className="w-24 h-24 object-cover rounded border" />
            ))}
          </div>
        </div>

        {/* Description + Status */}
        <div>
          <label className="block font-medium mb-2">Add Product Description</label>
          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded mb-4"
            placeholder="Write product details..."
            required
          />
          <label className="block mb-1 font-medium">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="available">Available</option>
            <option value="swap">Swap</option>
          </select>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Product
          </button>
        </div>
      </form>

      {/* Previous Listings */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">📦 Previous Listings:</h2>
        <PreviousListings />
      </div>
    </div>
  );
}
