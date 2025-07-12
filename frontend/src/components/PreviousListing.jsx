// src/components/PreviousListings.jsx
export default function PreviousListings() {
  // You can later fetch real data from your backend
  const dummyItems = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {dummyItems.map((_, i) => (
        <div
          key={i}
          className="h-32 bg-gray-200 rounded-lg shadow-inner flex items-center justify-center text-gray-600"
        >
          Product {i + 1}
        </div>
      ))}
    </div>
  );
}
