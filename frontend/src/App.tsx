import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import TestPage from './pages/TestPage.tsx';

function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
