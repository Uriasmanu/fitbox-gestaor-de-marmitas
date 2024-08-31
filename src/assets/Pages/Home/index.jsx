import { useState } from "react";
import BotaoMenu from "../../Components/BotaoMenu/BotaoMenu";
import Sidebar from "../../Components/Sidebar";
import BotaoNavegacao from "../../Components/BotaoNavegar/BotaoNavegar";
import './_inicio.scss';
import './_inicioMobile.scss';



// Importando os ícones corretamente
import iconeMarmita from '../../Image/marmita.svg';
import iconeFavoritar from '../../Image/favoritar.svg';
import iconeConsumidas from '../../Image/consumidas.svg';
import iconeHistorico from '../../Image/historico.svg';
import iconeReceita from '../../Image/receita.svg';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import ComponenteNotificacao from "../../Components/ComponenteNotificacao/ComponenteNotificacao";

import data from '../../JSONs/Marmitas.json';
const marmitas = data.Marmitas;


// Atualizando o objeto de navegação com as importações corretas
const navegacao = {
  abas: [
    { label: "Marmita", icon: iconeMarmita },
    { label: "Favoritar", icon: iconeFavoritar },
    { label: "Consumidas", icon: iconeConsumidas },
    { label: "Histórico", icon: iconeHistorico },
    { label: "Receita", icon: iconeReceita }
  ]
};

const Home = () => {
  const [sidebarVisivel, setSidebarVisivel] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState(null);

  const controleSidebar = () => {
    setSidebarVisivel(!sidebarVisivel);
  }

  const handleSelecaoAba = (index) => {
    setAbaSelecionada(index);
  };

  return (
    <div className="containerHome">
      <div className="botaoMenu">
        <BotaoMenu controleSidebar={controleSidebar} />
      </div>
      <header className="sideBar">
        <section className={sidebarVisivel ? 'sideBar invisivel' : 'sideBar visivel'}>
          <Sidebar />
        </section>
      </header>
      <main>
        <div className="titulo">
          <h2>Qual é a escolha saudável de hoje?</h2>
        </div>

        <div className="navegacao">
          {navegacao.abas.map((aba, index) => (
            <BotaoNavegacao
              key={index}
              icone={aba.icon}
              texto={aba.label}
              selecionado={abaSelecionada === index}
              onClick={() => handleSelecaoAba(index)}
            />
          ))}
        </div>

        <div className="container-cards-marmitas">
          {Array.isArray(marmitas) ? (
            marmitas.map(marmita => (
              <CardMarmita
                key={marmita.id}
                id={marmita.id}
                name={marmita.name}
                descricao={marmita.descricao}
                img={marmita.img}
              />
            ))
          ) : (
            <p>Erro: Dados de marmitas não são um array.</p>
          )}
        </div>

      </main>
      <section className="container-rightBar">
        <div className="topo">
          <ComponenteNotificacao />

        </div>
      </section>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Home;
