import React from "react";

interface ElementsListProps {
  elements: Array<{ type: string; content: any }>;
  handleElementClick: (index: number) => void;
  handleParagraphChange: (index: number, value: string) => void;
  handleAddParagraph: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ElementsList: React.FC<ElementsListProps> = ({
  elements,
  handleElementClick,
  handleParagraphChange,
  handleAddParagraph,
  handleImageChange,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleElementClick(index);
    }
  };

  return (
    <div className="form-group">
      <label>Éléments</label>
      <div>
        {elements.map((element, index) => (
          <div
            key={index}
            className="draggable-item"
            role="button"
            tabIndex={0}
            onClick={() => handleElementClick(index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
          >
            {element.type === "paragraph" && (
              <textarea
                value={element.content}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                className="form-control"
                placeholder={`Paragraphe ${index + 1}`}
              />
            )}
            {/* {element.type === "title" && element.content && (
              <input
                type="text"
                value={element.content}
                readOnly
                className="form-control"
                placeholder="Titre"
              />
            )} */}
            {/* {element.type === "banner" && element.content && (
              <img
                src={URL.createObjectURL(element.content)}
                alt="Bannière"
                className="form-control"
              />
            )} */}
            {/* {element.type === "image" && element.content && (
              <img
                src={URL.createObjectURL(element.content)}
                alt={`Image ${index + 1}`}
                className="form-control"
              />
            )} */}
          </div>
        ))}
      </div>
      <div className="add-paragraph-container">
        <button onClick={handleAddParagraph} className="add-paragraph-button">
          Ajouter un paragraphe
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default ElementsList;
