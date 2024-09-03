import './_ListaMarmitas.scss';
import CardMarmita from "../../Components/CardMarmita/CardMarmita";
import { useDragDrop } from '../../context/DragDropContext';

const ListaMarmitas = ({ items, toggleFavoritar, favoritedMarmitas }) => {
  const {
    onDragStart,
    onDragOver,
    onDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    rightBarVisible
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
      style={{ marginRight: rightBarVisible ? '300px' : '0' }}
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
