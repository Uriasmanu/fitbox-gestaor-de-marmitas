import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import data from '../../assets/JSONs/Marmitas.json';

// Criando o contexto
const MarmitaContext = createContext();

// Provider para o contexto de Marmitas
export const MarmitaProvider = ({ children }) => {
  const [items, setItems] = useState(data.Marmitas);
  const [dropAlmoco, setDropAlmoco] = useState([]);
  const [dropJantar, setDropJantar] = useState([]);
  const [favoritedIds, setFavoritedIds] = useState([]);

  const toggleFavoritar = (id) => {
    setFavoritedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoritedId) => favoritedId !== id)
        : [...prevIds, id]
    );
  };

  // Funções para arrastar e soltar
  const onDragStart = (e, fromZone, index) => {
    e.dataTransfer.setData("fromZone", fromZone);
    e.dataTransfer.setData("itemIndex", index);
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
      setItems((prevItems) => [...prevItems, item]);
    } else if (toZone === "almoco") {
      setDropAlmoco((prevDrop) => [...prevDrop, item]);
    } else if (toZone === "jantar") {
      setDropJantar((prevDrop) => [...prevDrop, item]);
    }
  };

  return (
    <MarmitaContext.Provider value={{ items, dropAlmoco, dropJantar, favoritedIds, onDragStart, onDrop, toggleFavoritar }}>
      {children}
    </MarmitaContext.Provider>
  );
};

MarmitaProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook customizado para usar o contexto de Marmitas
export const useMarmitas = () => useContext(MarmitaContext);
