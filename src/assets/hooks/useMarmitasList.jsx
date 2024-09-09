import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const useMarmitasList = () => {
  const [marmitas, setMarmitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarmitas = async () => {
      try {
        const token = localStorage.getItem('token') || Cookies.get('authToken');
        
        const response = await axios.get(
          'https://fit-box-api-b0c8eufpdxbxgve7.brazilsouth-01.azurewebsites.net/api/Marmitas',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Acessar o array de marmitas corretamente
        if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
          setMarmitas(response.data.$values);
        } else {
          setMarmitas([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarmitas();
  }, []);

  return { marmitas, loading, error };
};
