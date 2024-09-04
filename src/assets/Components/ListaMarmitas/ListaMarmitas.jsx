import './_ListaMarmitas.scss';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import { useDragDrop } from '../../context/DragDropContext';
import data from '../../JSONs/Marmitas.json';
import { useState } from 'react';

const marmitas = data.Marmitas;

const ListaMarmitas = () => {
  const [items, setItems] = useState(marmitas);
  const [favoritedIds, setFavoritedIds] = useState([]);

  const {
    onDragStart,
    onDragOver,
    onDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragDrop();

  const handleDrop = (e) => onDrop(e, "items");

  const toggleFavoritar = (id) => {
    setFavoritedIds((prevFavoritedIds) =>
      prevFavoritedIds.includes(id)
        ? prevFavoritedIds.filter((favoritedId) => favoritedId !== id)
        : [...prevFavoritedIds, id]
    );
  };

  const isFavorited = (id) => favoritedIds.includes(id);

  return (
    <div
      className="container-cards-marmitas"
      onDragOver={onDragOver}
      onDrop={handleDrop}
      onTouchStart={(e) => handleTouchStart(e, "items")}
      onTouchMove={(e) => handleTouchMove(e, () => {})} 
      onTouchEnd={handleTouchEnd}
    >
      {items.map((marmita) => (
        <div
          key={marmita.id}
          draggable
          onDragStart={(e) => onDragStart(e, marmita, "items")}
          style={{ cursor: "grab" }}
        >
          <CardMarmita
            id={marmita.id}
            name={marmita.name}
            descricao={marmita.descricao}
            img={marmita.img}
            isHidden={false}
            onToggleFavoritar={toggleFavoritar}
            isFavorited={isFavorited(marmita.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ListaMarmitas;