import React, { useEffect, useState } from "react";
import Rates from "../../services/Rates";
import { Link } from "react-router-dom";
import "../styles/utils/Resume.css";
import ModelRate from "../../models/ModelRate";

export default function Resume() {
  const [rates, setRates] = useState<ModelRate[]>([]);
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchRates = async () => {
      const ratesData = await Rates.Read();
      setRates(ratesData);
    };

    fetchRates();
  }, []);

  const groupedRates = rates.reduce(
    (acc: { [key: string]: ModelRate[] }, rate: ModelRate) => {
      const testTitle = rate.test.title;
      if (!acc[testTitle]) {
        acc[testTitle] = [];
      }
      acc[testTitle].push(rate);
      return acc;
    },
    {}
  );

  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume</h1>
      {userRole === "PROF" && (
        <div className="prof-options">
          <Link to="/professeur/creation-test">
            <button className="prof-button">
              Créer un questionnaire de test
            </button>
          </Link>
          <Link to="/professeur/stats">
            <button className="prof-button">Voir les stats étudiants</button>
          </Link>
        </div>
      )}
      {rates.length === 0 && userRole !== "PROF" ? (
        <div className="no-answers">
          <p>Aucun test effectué.</p>
          <Link to="/visiteur/probleme">
            <button className="test-button">Faire un test</button>
          </Link>
        </div>
      ) : (
        Object.keys(groupedRates).map((testTitle) => (
          <div key={testTitle} className="test-group">
            <h2 className="test-title">
              {testTitle} - {groupedRates[testTitle][0].test.study}
            </h2>
            <ul className="answers-list">
              {groupedRates[testTitle].map((rate, index) => (
                <li key={index} className="answer-item">
                  Note : {rate.note}/10 - Difficulté: {rate.test.dificulty} -
                  Étude: {rate.test.study}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
