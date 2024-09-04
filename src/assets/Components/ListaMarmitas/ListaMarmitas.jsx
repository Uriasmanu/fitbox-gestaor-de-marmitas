import './_ListaMarmitas.scss';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import { useDragDrop } from '../../context/DragDropContext';

import data from '../../JSONs/Marmitas.json';
import { useState } from 'react';

const marmitas = data.Marmitas;

const ListaMarmitas = ({  toggleFavoritar, favoritedMarmitas }) => {
  const [items, setItems] = useState(marmitas);
  const {
    onDragStart,
    onDragOver,
    onDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragDrop();

  const handleDrop = (e) => onDrop(e, "items");

  return (
    <div
      className="container-cards-marmitas"
      onDragOver={onDragOver}
      onDrop={handleDrop}
      onTouchStart={(e) => handleTouchStart(e, "items")}
      onTouchMove={(e) => handleTouchMove(e, () => {})} // Ajuste o handleTouchMove como necessário
      onTouchEnd={handleTouchEnd}
      
    >
      {items.map((marmita, index) => (
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
            isFavorited={favoritedMarmitas.has(marmita.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ListaMarmitas;
