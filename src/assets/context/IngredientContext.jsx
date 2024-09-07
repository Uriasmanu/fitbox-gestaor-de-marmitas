// IngredientContext.js
import PropTypes from 'prop-types';
import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [editIngredient, setEditIngredient] = useState(null);
    const [nomeMarmita, setNomeMarmita] = useState('');
    const [ingredientePesquisa, setIngredientePesquisa] = useState('');
    const [ingredientesAdicionados, setIngredientesAdicionados] = useState([]);
    const [tamanhoMarmita, setTamanhoMarmita] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [novoIngrediente, setNovoIngrediente] = useState('');

    const traduzirParaIngles = async (texto) => {
        try {
            const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: texto,
                    target: "en",
                    key: 'AIzaSyDjP3VDd60XMK5bdE4Uw3Zclya4Piv0wAI'
                }
            });
            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    const traduzirParaPortugues = async (texto) => {
        try {
            const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: texto,
                    target: "pt",
                    key: 'AIzaSyDjP3VDd60XMK5bdE4Uw3Zclya4Piv0wAI'
                }
            });
            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    const buscarIngredientes = async (query) => {
        try {
            const termoTraduzido = await traduzirParaIngles(query);
            const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                params: {
                    query: termoTraduzido,
                    pageSize: 10,
                    api_key: 'z8CqFn294O9VRiCN1eM2HZKc6fYiAINDijwwSuB7'
                }
            });

            const alimentos = response.data.foods || [];

            const alimentosTraduzidos = await Promise.all(
                alimentos.map(async (alimento) => {
                    const descricaoTraduzida = await traduzirParaPortugues(alimento.description);
                    return { ...alimento, descricaoTraduzida };
                })
            );

            setSugestoes(alimentosTraduzidos);
        } catch (error) {
            console.error('Erro ao buscar e traduzir alimentos:', error);
        }
    };

    const handleSugestaoClick = (ingrediente) => {
        setIngredientePesquisa(ingrediente.descricaoTraduzida);
        setSugestoes([]);
    };

    const adicionarIngrediente = () => {
        if (ingredientePesquisa) {
            setIngredientesAdicionados([...ingredientesAdicionados, { description: ingredientePesquisa, quantidade: '' }]);
            setIngredientePesquisa('');
        }
    };

    const handleExcluirIngrediente = (index) => {
        setIngredientesAdicionados((prevIngredientes) =>
            prevIngredientes.filter((_, i) => i !== index)
        );
    };

    

    

    return (
        <IngredientContext.Provider value={{
            editMode, setEditMode, editIngredient, setEditIngredient,
            nomeMarmita, setNomeMarmita,
            ingredientePesquisa, setIngredientePesquisa,
            ingredientesAdicionados, setIngredientesAdicionados,
            tamanhoMarmita, setTamanhoMarmita,
            quantidade, setQuantidade,
            sugestoes, setSugestoes,
            novoIngrediente, setNovoIngrediente,
            buscarIngredientes, handleSugestaoClick,
            adicionarIngrediente, handleExcluirIngrediente,
            
        }}>
            {children}
        </IngredientContext.Provider>
    );
};

IngredientProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useIngredient = () => useContext(IngredientContext);
