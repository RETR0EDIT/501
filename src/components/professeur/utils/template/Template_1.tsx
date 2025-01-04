import React, { useState } from "react";
import "../../../styles/professeur/utils/template/Template_1.css";
import BannerInput from "./BannerInput";
import TitleInput from "./TitleInput";
import ElementsList from "./ElementsList";
import Preview from "./Preview";
import DesignMode from "./DesignMode";

const Template_1: React.FC = () => {
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [elements, setElements] = useState<
    Array<{ type: string; content: any }>
  >([
    { type: "title", content: "" },
    { type: "paragraph", content: "" },
  ]);
  const [isDesignMode, setIsDesignMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [grid, setGrid] = useState<
    Array<{
      id: string;
      row: number;
      col: number;
      element: any;
      colspan?: number;
      rowspan?: number;
    }>
  >([]);
  const [numRows, setNumRows] = useState(Math.ceil(elements.length / 3) + 1);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newElements = elements.some((el) => el.type === "banner")
        ? elements.map((el) =>
            el.type === "banner" ? { ...el, content: files[0] } : el
          )
        : [...elements, { type: "banner", content: files[0] }];
      setElements(newElements);
      setBanner(files[0]);
    }
  };

  const handleTitleChange = (value: string) => {
    const newElements = elements.map((el) =>
      el.type === "title" ? { ...el, content: value } : el
    );
    setElements(newElements);
    setTitle(value);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newElements = [...elements];
    newElements[index].content = value;
    setElements(newElements);
  };

  const handleAddParagraph = () => {
    setElements([...elements, { type: "paragraph", content: "" }]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newElements = [
        ...elements,
        ...Array.from(e.target.files).map((file) => ({
          type: "image",
          content: file,
        })),
      ];
      setElements(newElements);
    }
  };

  const handleDesignClick = () => {
    setIsDesignMode(true);
  };

  const handleElementClick = (index: number) => {
    setSelectedElement(index);
  };

  const handleGridClick = (row: number, col: number) => {
    if (selectedElement !== null) {
      const newGrid = [
        ...grid,
        {
          id: `${row}-${col}-${Date.now()}`,
          row,
          col,
          element: elements[selectedElement],
          colspan: 1,
          rowspan: 1,
        },
      ];
      setGrid(newGrid);
      setSelectedElement(null);
    }
  };

  const handleSpanChange = (id: string, colspan: number, rowspan: number) => {
    const newGrid = grid.map((item) =>
      item.id === id ? { ...item, colspan, rowspan } : item
    );
    setGrid(newGrid);
  };

  const handleAddRow = () => {
    setNumRows(numRows + 1);
  };

  return (
    <div>
      <div className="template-container">
        <h1 className="template-title">Créer une Présentation</h1>
        <BannerInput handleBannerChange={handleBannerChange} />
        <TitleInput title={title} handleTitleChange={handleTitleChange} />
        <ElementsList
          elements={elements}
          handleElementClick={handleElementClick}
          handleParagraphChange={handleParagraphChange}
          handleAddParagraph={handleAddParagraph}
          handleImageChange={handleImageChange}
        />
        <Preview banner={banner} title={title} elements={elements} />
        <div className="design-button-container">
          <button onClick={handleDesignClick} className="design-button">
            Faire le design
          </button>
        </div>
      </div>

      {isDesignMode && (
        <DesignMode
          elements={elements}
          selectedElement={selectedElement}
          grid={grid}
          numRows={numRows}
          handleElementClick={handleElementClick}
          handleSpanChange={handleSpanChange}
          handleAddRow={handleAddRow}
        />
      )}
    </div>
  );
};

export default Template_1;
