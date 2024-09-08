import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './assets/Pages/NotFound';
import Home from './assets/Pages/Home';
import '../src/assets/Styles/_styleBase.scss';
import Login from './assets/Pages/Login/Login';
import { AuthProvider } from './assets/context/AuthContext';
import ProtectedRoute from './assets/Components/ProtectedRoute/ProtectedRoute';
import RegistrosMarmitas from './assets/Pages/RegistrosMarmitas/RegistrosMarmitas';
import { IngredientProvider } from './assets/context/IngredientContext';
import { SidebarProvider } from './assets/context/SidebarContext';
import { MarmitaProvider } from './assets/context/MarmitaContext';


function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <MarmitaProvider>
        <IngredientProvider>
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
              <Route
                path="/registrosMarmitas"
                element={
                  <ProtectedRoute>
                    <RegistrosMarmitas />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </IngredientProvider>
        </MarmitaProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
