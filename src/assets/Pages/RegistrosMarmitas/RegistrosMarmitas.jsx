import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss';
import './_RegistrosMarmitasMobile.scss';
import BotaoMenu from '../../Components/BotaoMenu/BotaoMenu';
import chef from '../../Image/ChefHat.svg';
import save from '../../Image/Save.svg';
import add from '../../Image/Add.svg';
import axios from 'axios';

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
                            </li>
                        ))}
                    </ul>

                    <div className="card__date">
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="card__arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                            <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H5.31066L10.5303 6.03033C10.8232 5.73744 10.8232 5.26256 10.5303 4.96967C10.2374 4.67678 9.76256 4.67678 9.46967 4.96967L3.67678 10.7626C2.99335 11.446 2.99335 12.554 3.67678 13.2374L9.46967 19.0303C9.76256 19.3232 10.2374 19.3232 10.5303 19.0303L13.4697 17.9697Z" />
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegistrosMarmitas;
