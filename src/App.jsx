import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registro from './assets/Pages/Registros';
import NotFound from './assets/Pages/NotFound';
import Home from './assets/Pages/Home';
import '../src/assets/Styles/_styleBase.scss';
import Login from './assets/Pages/Login/Login';
import { AuthProvider } from './assets/context/AuthContext';
import ProtectedRoute from './assets/Components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
