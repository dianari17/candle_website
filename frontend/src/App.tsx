import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import TestPage from './pages/TestPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import Signup from './pages/Signup';
import ProductsPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
