import { useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar";
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import ComponenteNotificacao from "../../Components/ComponenteNotificacao/ComponenteNotificacao";
import ComponenteUser from "../../Components/ComponenteUser/ComponenteUser";
import iconeMarmita from '../../Image/marmita.svg';
import iconeFavoritar from '../../Image/favoritar.svg';
import iconeConsumidas from '../../Image/consumidas.svg';
import iconeHistorico from '../../Image/historico.svg';
import iconeReceita from '../../Image/receita.svg';
import './_inicio.scss';
import './_inicioMobile.scss';
import ComponeteDia from "../../Components/ComponeteDia/ComponeteDia";
import EstoqueContador from "../../Components/EstoqueContador/EstoqueContador";
import BotaoMenu from "../../Components/Botoes/BotaoMenu/BotaoMenu";
import BotaoEnviar from "../../Components/Botoes/BotaoEnviar/BotaoEnviar";
import BotaoNavegacao from "../../Components/Botoes/BotaoNavegar/BotaoNavegar";
import { useSidebar } from "../../context/SidebarContext";
import { useMarmitas } from "../../context/MarmitaContext";
import { useMarmitasList } from "../../hooks/useMarmitasList";

const Home = () => {
  const { sidebarVisivel, controleSidebar } = useSidebar();
  const { dropAlmoco, dropJantar, favoritedIds, onDragStart, onDrop, toggleFavoritar } = useMarmitas();

  const [abaSelecionada, setAbaSelecionada] = useState(null);
  const [rightBarVisible, setRightBarVisible] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { marmitas, loading, error } = useMarmitasList();

  console.log('Marmitas:', marmitas); // Adicionado para depuração
  console.log('Erro:', error); // Adicionado para depuração

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

  const handleSelecaoAba = (index) => setAbaSelecionada(index);


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
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "items")}
          onTouchStart={(e) => handleTouchStart(e, 'main')}
          onTouchMove={(e) => handleTouchMove(e, 'main')}
          onTouchEnd={handleTouchEnd}
          style={{ marginRight: rightBarVisible ? '300px' : '0' }}
        >
          {marmitas.map((marmita) => (
            <CardMarmita
              key={marmita.id} // usando id como chave
              id={marmita.id}
              name={marmita.nameMarmita} // Ajustado para refletir o nome correto
              dataCriacao={marmita.dataCriacao || "Descrição não disponível"} // Ajuste conforme a estrutura real dos dados
              tamanhoMarmita={marmita.tamanhoMarmita}
              img={marmita.img || "default-image-url"} // Substitua com a URL padrão ou remova se não for aplicável
              isHidden={false} // Se necessário, ajuste a lógica para determinar se deve ser oculto
              onToggleFavoritar={() => toggleFavoritar(marmita.id)}
              isFavorited={favoritedIds.includes(marmita.id)}
            />
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, 'almoco')}
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, 'jantar')}
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
            <EstoqueContador />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
