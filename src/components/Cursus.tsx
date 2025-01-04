import React from "react";
import "./styles/cursus.css";

export default function Cursus() {
  return (
    <div className="cursus-container">
      <section className="GEA">
        <h1 className="gea-title">
          Gestion des entreprises et des administrations
        </h1>
        <div className="gea-content">
          <div className="gea-image-container">
            <img src="cursus_gea.svg" alt="" className="gea-image" />
          </div>
          <div className="gea-text-container">
            <div className="gea-description">
              <div className="gea-paragraph">
                <p>
                  Le BUT GEA est une formation polyvalente qui forme les
                  étudiants aux métiers de la gestion dans des contextes variés
                  : entreprises, associations ou administrations. En combinant
                  théorie et pratique, les étudiants y apprennent les
                  fondamentaux de la comptabilité, de la finance, de la gestion
                  des ressources humaines, du management et de l’analyse
                  stratégique. Cette formation leur permet de maîtriser les
                  outils nécessaires pour piloter les activités administratives
                  et financières d’une organisation, tout en s’adaptant aux
                  besoins du marché et aux évolutions économiques.
                </p>
              </div>
              <div className="gea-paragraph">
                <p>
                  Grâce à une spécialisation progressive, les étudiants peuvent
                  choisir parmi quatre parcours leur permettant de se concentrer
                  sur des domaines spécifiques (voir ci-dessous) Le BUT GEA
                  forme ainsi des professionnels capables de produire des
                  solutions adaptées et stratégiques pour améliorer la
                  performance des entreprises, tout en favorisant une gestion
                  optimale de leurs ressources.
                </p>
              </div>
            </div>
            <div className="gea-quiz">
              <div className="gea-quiz-title">
                <h1>Questionnaire</h1>
              </div>
              <div className="gea-quiz-description">
                <p>
                  Testez vos connaissances sur le monde de la gestion des
                  entreprises et des administrations avec notre quiz interactif
                  ! Découvrez si vous êtes prêt à relever les défis du secteur !
                </p>
                <div className="gea-quiz-button-container">
                  <button className="gea-quiz-button">Accèder ici</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="parcours">
        <h1>Parcours</h1>
        <div>
          <div className="parcours-ctn"></div>
          <div className="parcours-ctn"></div>
          <div className="parcours-ctn"></div>
          <div className="parcours-ctn"></div>
        </div>
      </section>

      <section className="mmmi"></section>
    </div>
  );
}
