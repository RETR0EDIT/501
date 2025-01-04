import React from "react";

interface TitleInputProps {
  title: string;
  handleTitleChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({
  title,
  handleTitleChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="title">Titre de la Présentation</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="form-control"
      />
    </div>
  );
};

export default TitleInput;
