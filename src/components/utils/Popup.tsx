import React from "react";
import "../styles/utils/Popup.css";

interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <div className="popup-container">
      <div className="popup-message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
