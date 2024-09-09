// useCreateMarmita.js
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

const useCreateMarmita = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { getUserId } = useAuth();

    const createMarmita = async (nomeMarmita, tamanhoMarmita, ingredientes, quantidade) => {
        setLoading(true);
        setError('');
    
        // Verifica se o token está presente
        const authToken = Cookies.get('authToken');
       // console.log('Auth Token:', authToken); 
    
        if (!authToken) {
            console.error('Token de autenticação não encontrado');
            setError('Token de autenticação não encontrado');
            setLoading(false);
            return;
        }
    
        try {
            const userId = getUserId(); // Obtém o ID do usuário logado
    
            const response = await axios.post(
                'https://fit-box-api-b0c8eufpdxbxgve7.brazilsouth-01.azurewebsites.net/api/Marmitas',
                {
                    nameMarmita: nomeMarmita,
                    tamanhoMarmita: tamanhoMarmita,
                    loginId: userId,
                    ingredientes: ingredientes.map(ingrediente => ({
                        nameIngrediente: ingrediente.description,
                         // Certifique-se de que isso é o esperado
                    })),
                    quantidadeEmGramas: quantidade
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                }
            );
    
            return response.data;
        } catch (err) {
            console.error('Erro ao criar marmita:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    

    return { createMarmita, loading, error };
};

export default useCreateMarmita;
