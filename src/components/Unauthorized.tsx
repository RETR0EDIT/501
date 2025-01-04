import React from "react";
import { Link } from "react-router-dom";
import "./styles/unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="container">
      <img src="/unauthorized.svg" alt="Accès refusé" className="image" />
      <div className="title">403 - Accès refusé</div>
      <div className="description">Vous n'avez pas l'autorisation d'accéder à cette page.</div>
      <Link to="/visiteur" className="button">Retour à l'accueil</Link>
    </div>
  );
};

export default Unauthorized;
