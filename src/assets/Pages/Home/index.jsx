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
  const [items, setItems] = useState(marmitas); // Usar marmitas diretamente como items
  const [dropZone, setDropZone] = useState([]);

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

    if (fromZone === "items" && toZone === "dropZone") {
      const item = items[itemIndex];
      setItems(items.filter((_, i) => i !== parseInt(itemIndex)));
      setDropZone([...dropZone, item]);
    } else if (fromZone === "dropZone" && toZone === "items") {
      const item = dropZone[itemIndex];
      setDropZone(dropZone.filter((_, i) => i !== parseInt(itemIndex)));
      setItems([...items, item]);
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
        
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Lista de Marmitas */}
          <div
            className="container-cards-marmitas"
            style={{ padding: "10px", border: "1px solid black", width: "200px" }}
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
                />
              </div>
            ))}
          </div>

          
        </div>
      </main>
      <section className="container-rightBar">
        <div className="topo">
          <ComponenteNotificacao />
          {/* Área de Drop */}
          <div
            style={{
              padding: "10px",
              border: "1px solid black",
              width: "200px",
              minHeight: "100px",
              background: "lightgray"
            }}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "dropZone")}
          >
            {dropZone.map((marmita, index) => (
              <div
                key={marmita.id}
                draggable
                onDragStart={(e) => onDragStart(e, "dropZone", index)}
                style={{ cursor: "grab" }}
              >
                <CardMarmita
                  id={marmita.id}
                  name={marmita.name}
                  descricao={marmita.descricao}
                  img={marmita.img}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Home;
