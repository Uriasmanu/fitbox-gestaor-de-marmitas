import { useState, useRef } from "react";
import BotaoMenu from "../../Components/BotaoMenu/BotaoMenu";
import Sidebar from "../../Components/Sidebar";
import BotaoNavegacao from "../../Components/BotaoNavegar/BotaoNavegar";
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import ComponenteNotificacao from "../../Components/ComponenteNotificacao/ComponenteNotificacao";
import ComponenteUser from "../../Components/ComponenteUser/ComponenteUser";
import BotaoEnviar from "../../Components/BotaoEnviar/BotaoEnviar";
import data from '../../JSONs/Marmitas.json';
import iconeMarmita from '../../Image/marmita.svg';
import iconeFavoritar from '../../Image/favoritar.svg';
import iconeConsumidas from '../../Image/consumidas.svg';
import iconeHistorico from '../../Image/historico.svg';
import iconeReceita from '../../Image/receita.svg';
import './_inicio.scss';
import './_inicioMobile.scss';
import ComponeteDia from "../../Components/ComponeteDia/ComponeteDia";
import EstoqueContador from "../../Components/EstoqueContador/EstoqueContador";

const Home = () => {
  const [sidebarVisivel, setSidebarVisivel] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState(null);
  const [items, setItems] = useState(data.Marmitas);
  const [dropAlmoco, setDropAlmoco] = useState([]);
  const [dropJantar, setDropJantar] = useState([]);
  const [rightBarVisible, setRightBarVisible] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRightBarRef = useRef(null);

  // Funções de arrasto e toque
  const handleTouchStart = (e, direction) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e, direction) => {
    if (!isDragging) return;
    const endX = e.touches[0].clientX;
    const deltaX = endX - startX;
    if (direction === 'main' && deltaX < -100) setRightBarVisible(true);
    if (direction === 'rightBar' && deltaX > 100) setRightBarVisible(false);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const onDragStart = (e, fromZone, index) => {
    e.dataTransfer.setData("fromZone", fromZone);
    e.dataTransfer.setData("itemIndex", index);
  };

  const onDragOver = (e) => e.preventDefault();

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

  const controleSidebar = () => setSidebarVisivel(!sidebarVisivel);

  const handleSelecaoAba = (index) => setAbaSelecionada(index);

  const [favoritedIds, setFavoritedIds] = useState([]);

  const toggleFavoritar = (id) => {
    setFavoritedIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(favoritedId => favoritedId !== id)
        : [...prevIds, id]
    );
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
          {[
            { label: "Marmita", icon: iconeMarmita },
            { label: "Favoritar", icon: iconeFavoritar },
            { label: "Consumidas", icon: iconeConsumidas },
            { label: "Histórico", icon: iconeHistorico },
            { label: "Receita", icon: iconeReceita }
          ].map((aba, index) => (
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
          className="container-visualizar"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, "items")}
          onTouchStart={(e) => handleTouchStart(e, 'main')}
          onTouchMove={(e) => handleTouchMove(e, 'main')}
          onTouchEnd={handleTouchEnd}
          style={{ marginRight: rightBarVisible ? '300px' : '0' }}
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
                onToggleFavoritar={toggleFavoritar}
                isFavorited={favoritedIds.includes(marmita.id)}
              />
            </div>
          ))}
        </div>
      </main>
      <section
        className={`container-rightBar ${rightBarVisible ? 'slide-in' : ''}`}
        ref={containerRightBarRef}
        onTouchStart={(e) => handleTouchStart(e, 'rightBar')}
        onTouchMove={(e) => handleTouchMove(e, 'rightBar')}
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
                  isHidden={false}
                  onToggleFavoritar={toggleFavoritar}
                  isFavorited={favoritedIds.includes(marmita.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="conatainer-drop-2">
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
                  isHidden={false}
                  onToggleFavoritar={toggleFavoritar}
                  isFavorited={favoritedIds.includes(marmita.id)}
                />
              </div>
            ))}
          </div>
          <div className="botao-enviar">
            <BotaoEnviar />
          </div>

        </div>

        <div>
          <h4>Marmitas em estoque</h4>

          <div className="estoque">
            <EstoqueContador/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
