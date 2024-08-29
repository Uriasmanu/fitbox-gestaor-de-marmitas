import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'; // Importa js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('authToken') || null); // Tenta ler o token do cookie
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'https://fit-box-api-b0c8eufpdxbxgve7.brazilsouth-01.azurewebsites.net/api/Conta/authenticate',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;

            if (data.token) {
                // Armazena o token no cookie e no estado
                Cookies.set('authToken', data.token, { expires: 1 }); // O cookie expira em 1 dias
                setToken(data.token);
                setIsAuthenticated(true);
            } else {
                setError("Falha ao entrar");
                setIsAuthenticated(false);
            }

        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Remove o cookie e atualiza o estado
        Cookies.remove('authToken');
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, error, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
