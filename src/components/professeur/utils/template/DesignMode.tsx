import React, { useState, useEffect } from "react";

interface DesignModeProps {
  elements: Array<{ type: string; content: any }>;
  selectedElement: number | null;
  grid: Array<{
    id: string;
    row: number;
    col: number;
    element: any;
    colspan?: number;
    rowspan?: number;
  }>;
  numRows: number;
  handleElementClick: (index: number) => void;
  handleSpanChange: (id: string, colspan: number, rowspan: number) => void;
  handleAddRow: () => void;
}

const DesignMode: React.FC<DesignModeProps> = ({
  elements,
  selectedElement,
  grid: initialGrid,
  numRows,
  handleElementClick,
  handleSpanChange,
  handleAddRow,
}) => {
  const [grid, setGrid] = useState(initialGrid);
  const [elementStyles, setElementStyles] = useState<{
    [key: number]: React.CSSProperties;
  }>({});
  const [widthUnit, setWidthUnit] = useState("px");
  const [heightUnit, setHeightUnit] = useState("px");

  useEffect(() => {
    console.log("Grid updated:", grid);
  }, [grid]);

  const nonEmptyElements = elements.filter(
    (element) =>
      (element.type === "paragraph" && element.content.trim() !== "") ||
      (element.type === "title" && element.content.trim() !== "") ||
      (element.type === "image" && element.content instanceof File) ||
      (element.type === "banner" && element.content instanceof File)
  );

  const handleStyleChange = (index: number, style: React.CSSProperties) => {
    console.log("handleStyleChange");
    setElementStyles((prevStyles) => ({
      ...prevStyles,
      [index]: { ...prevStyles[index], ...style },
    }));
    console.log("Style changed for element", index, style);
  };

  const handleRemoveElement = (
    row: number,
    col: number,
    event: React.MouseEvent
  ) => {
    console.log("handleRemoveElement");
    event.stopPropagation();
    const newGrid = grid.filter(
      (item) => !(item.row === row && item.col === col)
    );
    setGrid(newGrid);
    console.log("Element removed from grid:", { row, col });
  };

  const handleGridClick = (row: number, col: number) => {
    console.log("handleGridClick");
    if (selectedElement !== null) {
      const element = elements[selectedElement];
      const newGrid = [
        ...grid,
        { id: `${row}-${col}-${Date.now()}`, row, col, element },
      ];
      setGrid(newGrid);
      console.log("Element added to grid:", { row, col, element });
    }
  };

  const handleLocalSpanChange = (
    id: string,
    colspan: number,
    rowspan: number
  ) => {
    console.log("handleLocalSpanChange");
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((item) =>
        item.id === id ? { ...item, colspan, rowspan } : item
      );
      console.log("Grid after span change:", newGrid);
      return newGrid;
    });
    handleSpanChange(id, colspan, rowspan);
  };

  return (
    <div className="design-mode">
      <div className="elements-list">
        <div className="elements-container">
          <h3>Éléments disponibles</h3>
          {nonEmptyElements.map((element, index) => (
            <div
              key={index}
              className={`element-item ${
                selectedElement === index ? "selected" : ""
              }`}
              onClick={() => handleElementClick(index)}
            >
              {element.type === "title" && <p>Titre: {element.content}</p>}
              {element.type === "paragraph" && (
                <p>Paragraphe: {element.content}</p>
              )}
              {element.type === "image" && element.content instanceof File && (
                <p>Image: {element.content.name}</p>
              )}
              {element.type === "banner" && element.content instanceof File && (
                <p>Bannière: {element.content.name}</p>
              )}
            </div>
          ))}
        </div>
        <div className="elements-settings">
          {selectedElement !== null && (
            <div className="element-parameters">
              <h3>Paramètres de l'élément</h3>
              <div className="parameter">
                <label>
                  Taille du texte:
                  <input
                    type="number"
                    onChange={(e) =>
                      handleStyleChange(selectedElement, {
                        fontSize: `${e.target.value}px`,
                      })
                    }
                  />
                </label>
              </div>
              <div className="parameter">
                <label>
                  Couleur du texte:
                  <input
                    type="color"
                    onChange={(e) =>
                      handleStyleChange(selectedElement, {
                        color: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="parameter">
                <label>
                  Couleur de fond:
                  <input
                    type="color"
                    onChange={(e) =>
                      handleStyleChange(selectedElement, {
                        backgroundColor: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="parameter">
                <label>
                  Largeur de l'image:
                  <input
                    type="number"
                    onChange={(e) =>
                      handleStyleChange(selectedElement, {
                        width: `${e.target.value}${widthUnit}`,
                      })
                    }
                  />
                  <select
                    value={widthUnit}
                    onChange={(e) => setWidthUnit(e.target.value)}
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </label>
              </div>
              <div className="parameter">
                <label>
                  Hauteur de l'image:
                  <input
                    type="number"
                    onChange={(e) =>
                      handleStyleChange(selectedElement, {
                        height: `${e.target.value}${heightUnit}`,
                      })
                    }
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid-container">
        {Array.from({ length: numRows }).map((_, row) => (
          <div className="grid-row" key={row}>
            {Array.from({ length: 3 }).map((_, col) => {
              const gridItem = grid.find(
                (item) => item.row === row && item.col === col
              );
              const elementIndex = elements.findIndex(
                (el) =>
                  el.type === gridItem?.element.type &&
                  el.content === gridItem?.element.content
              );
              const elementStyle = elementStyles[elementIndex] || {};

              let responsiveClass = "";
              const width = elementStyle.width
                ? typeof elementStyle.width === "number"
                  ? elementStyle.width
                  : parseInt(elementStyle.width)
                : 0;

              if (width > 300) {
                responsiveClass = "large-element";
              } else if (width > 150) {
                responsiveClass = "medium-element";
              } else {
                responsiveClass = "small-element";
              }

              const cellClass = gridItem ? "" : "empty";

              return (
                <div
                  className={`grid-cell ${responsiveClass} col-${col} row-${row} ${cellClass}`}
                  key={col}
                  onClick={() => handleGridClick(row, col)}
                  style={{
                    gridColumn: `span ${gridItem?.colspan || 1}`,
                    gridRow: `span ${gridItem?.rowspan || 1}`,
                  }}
                >
                  {gridItem?.element.type === "title" && (
                    <h3
                      className="draggable-title"
                      style={elementStyle}
                      onClick={() => handleElementClick(elementIndex)}
                    >
                      {gridItem.element.content}
                    </h3>
                  )}
                  {gridItem?.element.type === "paragraph" && (
                    <p
                      className="draggable-paragraph"
                      style={elementStyle}
                      onClick={() => handleElementClick(elementIndex)}
                    >
                      {gridItem.element.content}
                    </p>
                  )}
                  {gridItem?.element.type === "image" &&
                    gridItem.element.content instanceof File && (
                      <img
                        src={URL.createObjectURL(gridItem.element.content)}
                        alt={`Contenu ${row * 3 + col + 1}`}
                        className="draggable-image"
                        style={elementStyle}
                        onClick={() => handleElementClick(elementIndex)}
                      />
                    )}
                  {gridItem?.element.type === "banner" &&
                    gridItem.element.content instanceof File && (
                      <img
                        src={URL.createObjectURL(gridItem.element.content)}
                        alt="Bannière"
                        className="draggable-banner"
                        style={elementStyle}
                        onClick={() => handleElementClick(elementIndex)}
                      />
                    )}
                  {selectedElement === elementIndex && (
                    <button
                      className="remove-element-button"
                      onClick={(e) => handleRemoveElement(row, col, e)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="span-controls">
        <button
          onClick={() => {
            console.log("handleAddRow");
            handleAddRow();
          }}
          className="add-row-button"
        >
          Ajouter une ligne
        </button>
        {grid.map((item) => (
          <div key={item.id} className="span-control">
            <label className="span-label">
              {`Colspan (Élément ${item.element.type} à la position ${item.row}-${item.col})`}{" "}
              :
              <input
                type="number"
                value={item.colspan || 1}
                min="1"
                max="3"
                onChange={(e) => {
                  const newColspan = parseInt(e.target.value);
                  console.log(
                    `Changing colspan for ${item.id} to ${newColspan}`
                  );
                  handleLocalSpanChange(item.id, newColspan, item.rowspan || 1);
                }}
                className="span-input"
              />
            </label>
            <label className="span-label">
              {`Rowspan (Élément ${item.element.type} à la position ${item.row}-${item.col})`}{" "}
              :
              <input
                type="number"
                value={item.rowspan || 1}
                min="1"
                max={numRows}
                onChange={(e) => {
                  const newRowspan = parseInt(e.target.value);
                  console.log(
                    `Changing rowspan for ${item.id} to ${newRowspan}`
                  );
                  handleLocalSpanChange(item.id, item.colspan || 1, newRowspan);
                }}
                className="span-input"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignMode;
