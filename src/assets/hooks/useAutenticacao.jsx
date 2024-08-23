const useAutenticacao = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        setError("")
    }

    try {
        const response = await fetch("https://fit-box-api-b0c8eufpdxbxgve7.brazilsouth-01.azurewebsites.net/api/Conta/authenticate", {
            method = "POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        } else {
            setError('Login failed');
            setIsAuthenticated(false);
        }

        const data = await response.json();
    } catch (err) {
        setError(err.message);
        setIsAuthenticated(false)
    } finally {
        setLoading(false);
    }

    const logout = () => {
        // Clear token and update state
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };
    return {
        isAuthenticated,
        error,
        loading,
        login,
        logout,
    };
};

export default useAutenticacao;