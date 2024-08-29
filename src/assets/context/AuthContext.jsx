import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
