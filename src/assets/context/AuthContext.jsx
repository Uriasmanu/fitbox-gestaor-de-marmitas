// AuthContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('authToken') || null);
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
                Cookies.set('authToken', data.token, { expires: 1 });
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
        Cookies.remove('authToken');
        setToken(null);
        setIsAuthenticated(false);
    };

    const getUserName = () => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.sub || 'Usuário'; 
            } catch (error) {
                return 'Usuário';
            }
        }
        return 'Usuário';
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, error, loading, login, logout, getUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
