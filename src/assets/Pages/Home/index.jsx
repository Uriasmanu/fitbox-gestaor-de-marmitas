import { useState, useRef } from "react";
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
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRightBarRef = useRef(null);

  // Funções de arrasto para o main
  const handleTouchStartMain = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMoveMain = (e) => {
    if (!isDragging) return;

    const endX = e.touches[0].clientX;
    const deltaX = endX - startX;

    // Detecta arrasto para a esquerda
    if (deltaX < -100) { // Ajuste a sensibilidade conforme necessário
      setRightBarVisible(true);
    }
  };

  const handleTouchEndMain = () => {
    setIsDragging(false);
  };

  // Funções de arrasto para o containerRightBar
  const handleTouchStartRightBar = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMoveRightBar = (e) => {
    if (!isDragging) return;

    const endX = e.touches[0].clientX;
    const deltaX = endX - startX;

    // Detecta arrasto para a direita
    if (deltaX > 100) { // Ajuste a sensibilidade conforme necessário
      setRightBarVisible(false);
    }
  };

  const handleTouchEndRightBar = () => {
    setIsDragging(false);
  };

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
      <main
        onTouchStart={handleTouchStartMain}
        onTouchMove={handleTouchMoveMain}
        onTouchEnd={handleTouchEndMain}
        style={{ marginRight: rightBarVisible ? '300px' : '0' }} // Ajuste o valor conforme o tamanho do container
      >
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

      <section
        className={`container-rightBar ${rightBarVisible ? 'slide-in' : ''}`}
        ref={containerRightBarRef}
        onTouchStart={handleTouchStartRightBar}
        onTouchMove={handleTouchMoveRightBar}
        onTouchEnd={handleTouchEndRightBar}
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

        <div className="conatainer-drop">
          <h4>Jantar</h4>
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

        <div className="container-botao-enviar">
          <BotaoEnviar />
        </div>
      </section>
    </div>
  );
};

export default Home;
