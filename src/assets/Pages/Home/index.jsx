import { useState } from "react";
import BotaoMenu from "../../Components/BotaoMenu/BotaoMenu";
import Sidebar from "../../Components/Sidebar";
import BotaoNavegacao from "../../Components/BotaoNavegar/BotaoNavegar";
import './_inicio.scss';
import './_inicioMobile.scss';

import iconeMarmita from '../../Image/marmita.svg';
import iconeFavoritar from '../../Image/favoritar.svg';
import iconeConsumidas from '../../Image/consumidas.svg';
import iconeHistorico from '../../Image/historico.svg';
import iconeReceita from '../../Image/receita.svg';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import ComponenteNotificacao from "../../Components/ComponenteNotificacao/ComponenteNotificacao";

import data from '../../JSONs/Marmitas.json';
import ComponeteDia from "../../Components/ComponeteDia/ComponeteDia";
import ComponenteUser from "../../Components/ComponenteUser/ComponenteUser";

const marmitas = data.Marmitas;

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
  const [items, setItems] = useState(marmitas);
  const [dropAlmoco, setDropAlmoco] = useState([]);
  const [dropJantar, setDropJantar] = useState([]);

  const onDragStart = (e, fromZone, index) => {
    e.dataTransfer.setData("fromZone", fromZone);
    e.dataTransfer.setData("itemIndex", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, toZone) => {
    e.preventDefault();

    const fromZone = e.dataTransfer.getData("fromZone");
    const itemIndex = e.dataTransfer.getData("itemIndex");

    let item;

    if (fromZone === "items") {
      item = items[itemIndex];
      setItems(items.filter((_, i) => i !== parseInt(itemIndex)));
    } else if (fromZone === "almoco") {
      item = dropAlmoco[itemIndex];
      setDropAlmoco(dropAlmoco.filter((_, i) => i !== parseInt(itemIndex)));
    } else if (fromZone === "jantar") {
      item = dropJantar[itemIndex];
      setDropJantar(dropJantar.filter((_, i) => i !== parseInt(itemIndex)));
    }

    if (toZone === "items") {
      setItems(prevItems => [...prevItems, item]);
    } else if (toZone === "almoco") {
      setDropAlmoco(prevDrop => [...prevDrop, item]);
    } else if (toZone === "jantar") {
      setDropJantar(prevDrop => [...prevDrop, item]);
    }
  };

  const controleSidebar = () => {
    setSidebarVisivel(!sidebarVisivel);
  };

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

        <div
          className="container-cards-marmitas"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "items")}
        >
          {items.map((marmita, index) => (
            <div
              key={marmita.id}
              draggable
              onDragStart={(e) => onDragStart(e, "items", index)}
              style={{ cursor: "grab" }}
            >
              <CardMarmita
                id={marmita.id}
                name={marmita.name}
                descricao={marmita.descricao}
                img={marmita.img}
                isHidden={false}
              />
            </div>
          ))}
        </div>
      </main>

      <section className="container-rightBar">
        <div className="topo">
          <ComponenteUser />

          <ComponenteNotificacao />
        </div>

        <div className="chamada-right">
          <h3>Monte suas refeições</h3>
          <ComponeteDia />
        </div>

        {/* Área de Drop para Almoço */}
        <div className="conatainer-drop-1">
          <h3>Almoço</h3>
          <div
            className="drop"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "almoco")}
          >
            {dropAlmoco.map((marmita, index) => (
              <div
                key={marmita.id}
                draggable
                onDragStart={(e) => onDragStart(e, "almoco", index)}
                style={{ cursor: "grab" }}
              >
                <CardMarmita
                  id={marmita.id}
                  name={marmita.name}
                  descricao={marmita.descricao}
                  img={marmita.img}
                  isHidden={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Área de Drop para Jantar */}
        <div className="conatainer-drop">
          <h3>Jantar</h3>
          <div
            className="drop"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "jantar")}
          >
            {dropJantar.map((marmita, index) => (
              <div
                key={marmita.id}
                draggable
                onDragStart={(e) => onDragStart(e, "jantar", index)}
                style={{ cursor: "grab" }}
              >
                <CardMarmita
                  id={marmita.id}
                  name={marmita.name}
                  descricao={marmita.descricao}
                  img={marmita.img}
                  isHidden={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
