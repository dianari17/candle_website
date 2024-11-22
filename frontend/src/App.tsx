import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import Login from './pages/Login.tsx';
import CartPage from './pages/CartPage.tsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
