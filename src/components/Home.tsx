import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
            <Link to="/#apropos-section">
            <button className="jpo-button">Découvrir l’IUT</button> </Link>
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
            L’IUT de Meaux, affilié à l’Université Gustave Eiffel, est un établissement d’enseignement supérieur au cœur de l’Île-de-France. 
            Il offre un cadre moderne et dynamique, idéal pour développer des compétences pratiques et théoriques dans divers domaines.
            <br />
            Sa mission : former de ETUDIANTS POUR DEVENIR professionnels qualifiés et polyvalents grâce à des projets concrets et une pédagogie innovante. 
            L’approche professionnalisante de l’IUT, ses infrastructures modernes, et ses liens avec le monde de l’entreprise en font un choix idéal pour réussir.</p>
            <br />
            <h1>Rejoindre l’IUT de Meaux, c’est opter pour :</h1>
            <ul>
              <li>Une formation adaptée aux besoins actuels.</li>
              <li>Un accompagnement personnalisé dans un environnement à taille humaine.</li>
              <li>De multiples opportunités professionnelles et académiques.</li>
            </ul>
            <div className="apropos-actions">
              {/* <button className="apropos-button">
                En savoir plus
                <img
                  src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                  alt=""
                  className="apropos-image"
                />
                
              </button> */}
            </div>
          </div>
          
        </div>





        
        <div className="apropos-content-right">
          <img className="apropos-img" src="/apropos.svg" alt="" />
          <img className="apropos-row-img" src="/apropos-row.svg" alt="" />
        </div>
      </section>
      <section className="nos_formation">
        <div className="formation_container">
          <h1 className="formation_title">Nos formations</h1>
          <div className="formation_list">
            <div className="formation_item">
            <Link to="/cursus#mmi">
              <img src="mmi.svg" alt="MMI" className="formation_image" />
              <p className="formation_description"> Métiers du Multimédia et de l'Internet </p>
              </Link>
            </div>
            <div className="formation_item">
            <Link to="/cursus#gea">
              <img src="gea.svg" alt="GEA" className="formation_image" />
              <p className="formation_description"> Gestions des Entreprises et des Administrations</p>
              </Link>
            </div>
            <div className="formation_item">
            <Link to="/cursus#tc">
              <img src="tc.svg" alt="TC" className="formation_image" />
              <p className="formation_description"> Techniques de Commercialisation</p>
              </Link>
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
              <Link to="/room-tour">
              <button className="visit_button">
                En savoir plus
                <img
                  src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                  alt=""
                  className="apropos-image"
                />
              </button>
              </Link>
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
