import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import Signup from './pages/Signup';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
