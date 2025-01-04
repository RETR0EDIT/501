import React from "react";

interface PreviewProps {
  banner: File | null;
  title: string;
  elements: Array<{ type: string; content: any }>;
}

const Preview: React.FC<PreviewProps> = ({ banner, title, elements }) => {
  return (
    <div className="preview">
      {banner && (
        <div className="banner-preview">
          <h2>Aperçu de la bannière</h2>
          <img src={URL.createObjectURL(banner)} alt="Bannière" />
        </div>
      )}
      <h2 className="preview-title">{title}</h2>
      {elements
        .filter((el) => el.type === "paragraph")
        .map((element, index) => (
          <p key={index} className="preview-paragraph">
            {element.content}
          </p>
        ))}
      {elements
        .filter((el) => el.type === "image")
        .map((element, index) => (
          <div key={index} className="image-preview">
            {element.content instanceof File ? (
              <img
                src={URL.createObjectURL(element.content)}
                alt={`Contenu ${index + 1}`}
                className="preview-image"
              />
            ) : (
              <p>Contenu non valide</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default Preview;
