import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss';
import './_RegistrosMarmitasMobile.scss';
import chef from '../../Image/ChefHat.svg';
import save from '../../Image/Save.svg';
import add from '../../Image/Add.svg';
import axios from 'axios';
import BotaoMenu from '../../Components/Botoes/BotaoMenu/BotaoMenu';
import BotaoExcluir from '../../Components/Botoes/BotaoExcluir/BotaoExcluir';
import BotaoEditar from '../../Components/Botoes/BotaoEditar/BotaoEditar';


const RegistrosMarmitas = () => {
    const [sidebarVisivel, setSidebarVisivel] = useState(false);
    const [nomeMarmita, setNomeMarmita] = useState('');
    const [ingredientePesquisa, setIngredientePesquisa] = useState('');
    const [ingredientesAdicionados, setIngredientesAdicionados] = useState([]);
    const [tamanhoMarmita, setTamanhoMarmita] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [sugestoes, setSugestoes] = useState([]);

    const controleSidebar = () => {
        setSidebarVisivel(!sidebarVisivel);
    };

    // Função para traduzir do português para o inglês
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

    // Função para traduzir do inglês para o português
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

    // Função para buscar e traduzir ingredientes
    const buscarIngredientes = async (query) => {
        try {
            // Traduz o termo de busca para inglês, pois a API requer isso
            const termoTraduzido = await traduzirParaIngles(query);

            // Busca ingredientes com o termo traduzido
            const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                params: {
                    query: termoTraduzido,
                    pageSize: 10,
                    api_key: 'z8CqFn294O9VRiCN1eM2HZKc6fYiAINDijwwSuB7'
                }
            });

            // Recebe a lista de alimentos da API
            const alimentos = response.data.foods || [];

            // Traduz a descrição dos alimentos para português
            const alimentosTraduzidos = await Promise.all(
                alimentos.map(async (alimento) => {
                    const descricaoTraduzida = await traduzirParaPortugues(alimento.description); // Traduz para português
                    return { ...alimento, descricaoTraduzida }; // Retorna o alimento com a descrição traduzida
                })
            );

            // Atualiza o estado com os alimentos traduzidos
            setSugestoes(alimentosTraduzidos);

        } catch (error) {
            console.error('Erro ao buscar e traduzir alimentos:', error);
        }
    };

    const handleSugestaoClick = (ingrediente) => {
        setIngredientePesquisa(ingrediente.descricaoTraduzida); // Usa a descrição traduzida
        setSugestoes([]);
    };

    useEffect(() => {
        if (ingredientePesquisa.length > 2) {
            buscarIngredientes(ingredientePesquisa);
        } else {
            setSugestoes([]);
        }
    }, [ingredientePesquisa]);

    const adicionarIngrediente = () => {
        if (ingredientePesquisa) {
            setIngredientesAdicionados([...ingredientesAdicionados, { description: ingredientePesquisa, quantidade: '' }]);
            setIngredientePesquisa('');
        }
    };

    return (
        <div className='RegistrosMarmitas'>
            <div className="botaoMenu">
                <BotaoMenu controleSidebar={controleSidebar} />
            </div>
            <header className="sideBar">
                <section className={sidebarVisivel ? 'sideBar invisivel' : 'sideBar visivel'}>
                    <Sidebar />
                </section>
            </header>
            <main>
                <form className="form">
                    <img src={chef} alt="ícone de chapéu de cozinha" />
                    <input
                        className="input"
                        placeholder="Nome da marmita"
                        type="text"
                        value={nomeMarmita}
                        onChange={(e) => setNomeMarmita(e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Tamanho da vasilha"
                        type="text"
                        value={tamanhoMarmita}
                        onChange={(e) => setTamanhoMarmita(e.target.value)}
                    />
                    <div className='ingredientes'>
                        <div className='busca'>
                            <input
                                className="input"
                                placeholder="Ingredientes"
                                type="text"
                                value={ingredientePesquisa}
                                onChange={(e) => setIngredientePesquisa(e.target.value)}
                            />
                            {sugestoes.length > 0 && (
                                <ul className="sugestoes-list">
                                    {sugestoes.map((ingrediente) => (
                                        <li
                                            key={ingrediente.fdcId}
                                            onClick={() => handleSugestaoClick(ingrediente)}
                                        >
                                            {ingrediente.descricaoTraduzida} {/* Usa a descrição traduzida */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            className="input quantidade"
                            placeholder="kg"
                            type="text"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn adicionar" onClick={adicionarIngrediente}>
                        <img src={add} alt="ícone de adicionar" />
                        Adicionar ingrediente
                    </button>
                    <button className="btn criar">
                        <img src={save} alt="ícone de salvar" />
                        Criar marmita
                    </button>
                </form>

                <div className="card">
                    <h3 className="card__title">{nomeMarmita || 'Nome da Marmita'}</h3>
                    <p>{tamanhoMarmita || 'Tamanho da Marmita'} g</p>
                    <p className="card__content"></p>
                    Ingredientes:
                    <ul>
                        {ingredientesAdicionados.map((ingrediente, index) => (
                            <li key={index}>
                                {ingrediente.description} - {quantidade} g
                                <BotaoExcluir/>
                            </li>
                        ))}
                    </ul>

                    <div className="card__date">
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="card__arrow">
                        <BotaoEditar/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegistrosMarmitas;
