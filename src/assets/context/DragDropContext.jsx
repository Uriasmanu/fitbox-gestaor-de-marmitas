import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'

// Cria o contexto
const DragDropContext = createContext();

// Provedor do contexto
export const DragDropProvider = ({ children }) => {
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [fromZone, setFromZone] = useState('');
  
  const handleTouchStart = (e, zone) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    setFromZone(zone);
  };

  const handleTouchMove = (e, handleDrag) => {
    if (!isDragging) return;
    handleDrag(e);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setCurrentItem(null);
  };

  const onDragStart = (e, item, zone) => {
    e.dataTransfer.setData("fromZone", zone);
    e.dataTransfer.setData("itemIndex", item.index);
    setCurrentItem(item);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, toZone, updateLists) => {
    e.preventDefault();
    const fromZone = e.dataTransfer.getData("fromZone");
    const itemIndex = e.dataTransfer.getData("itemIndex");
    updateLists(fromZone, toZone, itemIndex);
  };

  return (
    <DragDropContext.Provider
      value={{
        startX,
        isDragging,
        currentItem,
        fromZone,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        onDragStart,
        onDragOver,
        onDrop
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para usar o contexto
export const useDragDrop = () => useContext(DragDropContext);
