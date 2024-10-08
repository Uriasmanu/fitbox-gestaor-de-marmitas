import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import './_RegistrosMarmitas.scss';
import './_RegistrosMarmitasMobile.scss';
import chef from '../../Image/ChefHat.svg';
import save from '../../Image/Save.svg';
import add from '../../Image/Add.svg';
import BotaoMenu from '../../Components/Botoes/BotaoMenu/BotaoMenu';
import BotaoExcluir from '../../Components/Botoes/BotaoExcluir/BotaoExcluir';
import { useIngredient } from '../../context/IngredientContext';
import useCreateMarmita from '../../hooks/useCreateMarmita';
import CardSucesso from '../../Components/CardSucesso/CardSucesso';

const RegistrosMarmitas = () => {
    const [sidebarVisivel, setSidebarVisivel] = useState(false);
    const [marmitaCriadaComSucesso, setMarmitaCriadaComSucesso] = useState(false);

    const {
        nomeMarmita, setNomeMarmita,
        ingredientePesquisa, setIngredientePesquisa,
        ingredientesAdicionados,
        tamanhoMarmita, setTamanhoMarmita,
        quantidade, setQuantidade,
        sugestoes, setSugestoes,
        buscarIngredientes, handleSugestaoClick,
        adicionarIngrediente, handleExcluirIngrediente,
    } = useIngredient();

    const { createMarmita, loading } = useCreateMarmita();

    const controleSidebar = () => {
        setSidebarVisivel(!sidebarVisivel);
    };

    useEffect(() => {
        if (ingredientePesquisa.length > 2) {
            buscarIngredientes(ingredientePesquisa);
        } else {
            setSugestoes([]);
        }
    }, [ingredientePesquisa]);

    const handleCreateMarmita = async () => {
        try {
            await createMarmita(nomeMarmita, tamanhoMarmita, ingredientesAdicionados, quantidade);
            // Define o estado para mostrar o CardSucesso
            setMarmitaCriadaComSucesso(true);
        } catch (err) {
            // Handle error, show a message to the user
            console.error('Erro ao criar marmita:', err);
        }
    };

    const handleDismissSucesso = () => {
        setMarmitaCriadaComSucesso(false);
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
                </form>

                {marmitaCriadaComSucesso ? (
                    <CardSucesso onDismiss={handleDismissSucesso} />
                ) : (
                    <div className="card">
                        <h3 className="card__title">{nomeMarmita || 'Nome da Marmita'}</h3>
                        <p>{tamanhoMarmita || 'Tamanho da Marmita'} g</p>
                        <p className="card__content"></p>
                        Ingredientes:
                        <ul>
                            {ingredientesAdicionados.map((ingrediente, index) => (
                                <li key={index}>
                                    {ingrediente.description} - {quantidade} g
                                    <BotaoExcluir onClick={() => handleExcluirIngrediente(index)} />
                                </li>
                            ))}
                        </ul>

                        <div className="card__date">
                            {new Date().toLocaleDateString()}
                        </div>
                        <button
                            type="button"
                            className="btn criar"
                            onClick={handleCreateMarmita}
                            disabled={loading}
                        >
                            <img src={save} alt="ícone de salvar" />
                            {loading ? 'Criando...' : 'Criar marmita'}
                        </button>
                        <div className="card__arrow">
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RegistrosMarmitas;
