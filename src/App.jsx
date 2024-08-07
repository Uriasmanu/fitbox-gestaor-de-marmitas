import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Registro from './assets/Pages/Registros';
import NotFound from './assets/Pages/NotFound';
import Home from './assets/Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
