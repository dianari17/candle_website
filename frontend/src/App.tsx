import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestPage from './pages/TestPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import Login from './pages/Login.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
