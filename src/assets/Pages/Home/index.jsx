import { useState } from 'react';
import { useDragDrop } from '../../context/DragDropContext';
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
import ComponenteUser from "../../Components/ComponenteUser/ComponenteUser";
import BotaoEnviar from "../../Components/BotaoEnviar/BotaoEnviar";
import ComponeteDia from './../../Components/ComponeteDia/ComponeteDia';
import ListaMarmitas from "../../Components/ListaMarmitas/ListaMarmitas";

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
  const [rightBarVisible, setRightBarVisible] = useState(false);
  const [favoritedMarmitas, setFavoritedMarmitas] = useState(new Set());

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    onDragStart,
    onDragOver,
    onDrop
  } = useDragDrop();

  const toggleFavoritar = (id) => {
    setFavoritedMarmitas(prev => {
      const newFavorited = new Set(prev);
      if (newFavorited.has(id)) {
        newFavorited.delete(id);
      } else {
        newFavorited.add(id);
      }
      return newFavorited;
    });
  };

  const controleSidebar = () => {
    setSidebarVisivel(!sidebarVisivel);
  };

  const handleSelecaoAba = (index) => {
    setAbaSelecionada(index);
  };

  const updateLists = (fromZone, toZone, itemIndex) => {
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

        <ListaMarmitas
          items={items}
          toggleFavoritar={toggleFavoritar}
          favoritedMarmitas={favoritedMarmitas}
        />
      </main>

      <section
        className={`container-rightBar ${rightBarVisible ? 'slide-in' : ''}`}
        onTouchStart={(e) => handleTouchStart(e, "rightBar")}
        onTouchMove={(e) => handleTouchMove(e, () => {})} // Ajuste o handleTouchMove como necessário
        onTouchEnd={handleTouchEnd}
      >
        <div className="topo">
          <ComponenteUser />
          <ComponenteNotificacao />
        </div>

        <div className="chamada-right">
          <h4>Monte suas refeições</h4>
          <ComponeteDia />
        </div>

        <div className="conatainer-drop-1">
          <h4>Almoço</h4>
          <div
            className="drop"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "almoco", updateLists)}
          >
            {dropAlmoco.map((marmita, index) => (
              <div
                key={marmita.id}
                draggable
                onDragStart={(e) => onDragStart(e, marmita, "almoco")}
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

        <div className="conatainer-drop">
          <h4>Jantar</h4>
          <div
            className="drop"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "jantar", updateLists)}
          >
            {dropJantar.map((marmita, index) => (
              <div
                key={marmita.id}
                draggable
                onDragStart={(e) => onDragStart(e, marmita, "jantar")}
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

        <div className="container-botao-enviar">
          <BotaoEnviar />
        </div>
      </section>
    </div>
  );
};

export default Home;
