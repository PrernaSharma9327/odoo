import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import PreviousListings from '../src/components/PreviousListing'; // or your homepage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PreviousListings />} /> {/* ✅ Homepage */}
        <Route path="/item/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
