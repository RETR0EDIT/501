import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./styles/home.css";
import { useDarkMode } from "./utils/DarkModeContext";

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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

      <section className="apropos-section" id="apropos-section">
        <div className="apropos-content-left">
          <div className="apropos-header">
            <h2 className="apropos-title">À Propos de l’iut</h2>
          </div>
          <div className="apropos-text">
            <p>
            L’IUT de Meaux vous ouvre ses portes pour une journée riche en découvertes. 
            Venez explorer nos locaux modernes, rencontrer nos enseignants et étudiants, 
            et en apprendre davantage sur nos formations adaptées aux enjeux professionnels d’aujourd’hui. 
            Une occasion idéale pour découvrir un lieu d’apprentissage tourné vers l’avenir.            </p>
            <p>
            À l’IUT de Meaux, nous combinons excellence académique et proximité avec le monde professionnel.
             Nos formations, nos équipements et notre pédagogie innovante offrent un cadre stimulant pour réussir 
             et se préparer à l’avenir. Profitez de cette journée pour comprendre ce qui fait la force de notre établissement.
            </p>
            <p>
            Nos équipes de professeurs et d'étudiants seront présentes pour répondre à vos questions et vous accompagner dans votre projet professionnel. 
            Que ce soit sur place ou via nos contacts en ligne, nous sommes là pour vous guider et vous faire découvrir 
            tout ce que l’IUT de Meaux peut vous offrir.
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
        <div className="formation_container">
          <h1 className="formation_title">Nos formations</h1>
          <div className="formation_list">
            <div className="formation_item">
              <img src="mmi.svg" alt="MMI" className="formation_image" />
              <p className="formation_description"></p>
            </div>
            <div className="formation_item">
              <img src="gea.svg" alt="GEA" className="formation_image" />
              <p className="formation_description"></p>
            </div>
            <div className="formation_item">
              <img src="tc.svg" alt="TC" className="formation_image" />
              <p className="formation_description"></p>
            </div>
          </div>
        </div>
        <div className="visit_container">
          <div className="visit_content">
            <div className="visit_header">
              <h1 className="visit_title">
                Préparez votre visite dès maintenant
              </h1>
            </div>

            <div className="visit_description">
              <p>
                En vue de notre Journée Portes Ouvertes, plongez dans une visite
                virtuelle immersive pour découvrir tout ce qui vous attend à
                l’IUT de Meaux. Familiarisez-vous avec nos locaux, explorez les
                salles de cours, fond vert, réalité virtuelle, et les espaces
                étudiants avant même de venir sur place.
              </p>
            </div>
            <div className="visit_button_container">
              <button className="visit_button">
                En savoir plus
                <img
                  src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                  alt=""
                  className="apropos-image"
                />
              </button>
            </div>
          </div>
          <div className="visit_image_container">
            <img src="formation.svg" alt="Formation" className="visit_image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
