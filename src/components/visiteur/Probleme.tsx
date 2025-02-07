import React, { useState, useEffect } from "react";
import Tests from "../../services/Tests";
import ModelTest from "../../models/ModelTest";
import { Link } from "react-router-dom";
import "../styles/visiteur/Probleme.css";

export default function Probleme() {
  const [tests, setTests] = useState<ModelTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudy, setSelectedStudy] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await Tests.Read();
        setTests(response);
      } catch (err) {
        setError("Erreur lors de la récupération des tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleFilterChange = async (study) => {
    setSelectedStudy(study);
    setLoading(true);
    try {
      if (study === "") {
        const response = await Tests.Read();
        setTests(response); // Afficher tous les tests si aucune filière n'est sélectionnée
      } else {
        const response = await Tests.GetByStudy(study);
        setTests(response);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des tests.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="probleme-container">
      <div className="cnt-title">
        <h1 className="title">CHOISIS TON QUIZZ</h1>
      </div>
      <ul className="filter-list">
        <li className="filter-item">
          <button
            className={`filter-button ${selectedStudy === "" ? "active" : ""}`}
            onClick={() => handleFilterChange("")}
          >
            Tous
          </button>
        </li>
        <li className="filter-item">
          <button
            className={`filter-button ${
              selectedStudy === "MMI" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("MMI")}
          >
            MMI
          </button>
        </li>
        <li className="filter-item">
          <button
            className={`filter-button ${
              selectedStudy === "GEA" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("GEA")}
          >
            GEA
          </button>
        </li>
        <li className="filter-item">
          <button
            className={`filter-button ${
              selectedStudy === "TC" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("TC")}
          >
            TC
          </button>
        </li>
      </ul>
      {tests.length === 0 ? (
        <div className="no-results">
          Aucun test trouvé pour la filière sélectionnée.
        </div>
      ) : (
        <ul className="test-list">
          {tests.map((test) => (
            <Link
              to={`/visiteur/templateTests/${test.id}`}
              state={{ testName: test.title }}
              key={test.id}
              className="test-link"
            >
              <li className="test-item">
                <h2 className="test-title">{test.title}</h2>
                <p className="test-custom-text">{test.customText}</p> {/* Affiche le texte personnalisé */}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
