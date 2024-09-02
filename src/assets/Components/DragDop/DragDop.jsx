import { useState } from 'react';

function DragDrop() {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [dropZone, setDropZone] = useState([]);

  const onDragStart = (e, fromZone, index) => {
    // Definir a origem (zona) do item arrastado e seu índice
    e.dataTransfer.setData("fromZone", fromZone);
    e.dataTransfer.setData("itemIndex", index);
  };

  const onDragOver = (e) => {
    // Permitir o drop
    e.preventDefault();
  };

  const onDrop = (e, toZone) => {
    e.preventDefault();
    
    const fromZone = e.dataTransfer.getData("fromZone");
    const itemIndex = e.dataTransfer.getData("itemIndex");

    // Movimentar o item de uma zona para outra
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

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Área onde os itens podem ser arrastados */}
      <div 
        style={{ padding: "10px", border: "1px solid black", width: "200px" }}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, "items")}
      >
        <h4>Itens:</h4>
        {items.map((item, index) => (
          <div 
            key={index}
            draggable 
            onDragStart={(e) => onDragStart(e, "items", index)} 
            style={{ padding: "10px", background: "lightblue", margin: "5px", cursor: "grab" }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Área de drop */}
      <div 
        style={{ padding: "10px", border: "1px solid black", width: "200px", minHeight: "100px", background: "lightgray" }}
        onDragOver={onDragOver} 
        onDrop={(e) => onDrop(e, "dropZone")}
      >
        <h4>Área de Drop:</h4>
        {dropZone.map((item, index) => (
          <div 
            key={index}
            draggable 
            onDragStart={(e) => onDragStart(e, "dropZone", index)} 
            style={{ padding: "10px", background: "lightgreen", margin: "5px", cursor: "grab" }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDrop;
