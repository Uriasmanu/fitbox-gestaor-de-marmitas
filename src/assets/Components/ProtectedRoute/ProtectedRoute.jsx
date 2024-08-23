import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
