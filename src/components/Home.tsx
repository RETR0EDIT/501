import React from "react";
import "./styles/home.css";
import { useDarkMode } from "./utils/DarkModeContext";

const Home = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="home-container">
      <div className="jpo-section">
        <div className="jpo-content">
          <div className="jpo-header">
            <h1 className="jpo-title">JOURNÉE PORTE OUVERTE</h1>
          </div>
          <p className="jpo-date">14 avril 2025</p>
          <div className="jpo-actions">
            <button className="jpo-button">Découvrir l’IUT</button>
            <img src="/logo_univ3d.svg" alt="logo 3d" className="jpo-image" />
          </div>
        </div>
      </div>

      <section className="apropos-section">
        <div className="apropos-content-left">
          <div className="apropos-header">
            <h2 className="apropos-title">À Propos de l’iut</h2>
          </div>
          <div className="apropos-text">
            <p>
              Je suis un paragraphe. Cliquez ici pour ajouter votre propre
              texte. Cliquez sur "Modifier Texte" ou double-cliquez ici pour
              ajouter votre contenu et personnaliser les polices. Déplacez-moi
              où vous le souhaitez sur votre page.
            </p>
            <p>
              C'est l'espace idéal pour présenter votre entreprise, vos services
              et vos équipes en détails. Présentez votre équipe et les services
              proposés. Racontez l'histoire de votre entreprise et la raison
              pour laquelle elle a été crée.
            </p>
            <p>
              services et vos équipes en détails. Présentez votre équipe et les
              services proposés. Racontez l'histoire de votre entreprise et la
              raison pour laquelle elle a été crée.
            </p>
            <div className="apropos-actions">
              <button className="apropos-button">
                En savoir plus
                <img
                  src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                  alt=""
                  className="apropos-image"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="apropos-content-right">
          <img src="/apropos.svg" alt="" />
        </div>
      </section>
      <section className="nos_formation">
        <div>
          <h1>Nos formations</h1>
          <div>
            <div>
              <img src="" alt="" />
              <p></p>
            </div>
            <div>
              <img src="" alt="" />
              <p></p>
            </div>

            <div>
              <img src="" alt="" />
              <p></p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1>Préparez votre visite dès maintenant</h1>
            </div>
            <div>
              <p>
                En vue de notre Journée Portes Ouvertes, plongez dans une visite
                virtuelle immersive pour découvrir tout ce qui vous attend à
                l’IUT de Meaux. Familiarisez-vous avec nos locaux, explorez les
                salles de cours, fond vert, réalité virtuelle, et les espaces
                étudiants avant même de venir sur place.
              </p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
