import React, { useState } from "react";
import Template_1 from "./utils/template/Template_1";
import Template_2 from "./utils/template/Template_2";
import "../styles/professeur/Template.css";

const TemplateSelector: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template_1":
        return <Template_1 />;
      case "template_2":
        return <Template_2 />;
      default:
        return <p>Veuillez sélectionner un template.</p>;
    }
  };

  return (
    <div className="template-selector-container">
      <h1>Sélectionnez un Template</h1>
      <div className="template-buttons">
        <button onClick={() => setSelectedTemplate("template_1")}>
          Template 1
        </button>
        <button onClick={() => setSelectedTemplate("template_2")}>
          Template 2
        </button>
      </div>
      <div className="template-display">{renderTemplate()}</div>
    </div>
  );
};

export default TemplateSelector;
