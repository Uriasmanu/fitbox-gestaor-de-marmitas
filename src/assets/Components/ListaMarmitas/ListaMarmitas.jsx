import './_ListaMarmitas.scss';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import { useDragDrop } from '../../context/DragDropContext';
import data from '../../JSONs/Marmitas.json';
import { useState } from 'react';
import PropTypes from 'prop-types';

const marmitas = data.Marmitas;

const ListaMarmitas = ({ toggleFavoritar, favoritedMarmitas }) => {
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
            isFavorited={favoritedMarmitas(marmita.id)}
          />
        </div>
      ))}
    </div>
  );
};

ListaMarmitas.propTypes = {
  toggleFavoritar: PropTypes.func.isRequired,
  favoritedMarmitas: PropTypes.func.isRequired,
};

export default ListaMarmitas;
