import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';

window.addEventListener("pagehide", () => {
  let rememberMe = localStorage.getItem("remember");
  if(rememberMe != "true")
  {
    localStorage.clear()
  }
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </Router>
  );
}

export default App;
