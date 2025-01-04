import React, { useEffect, useState } from "react";
import ModelAnswers from "../../models/ModelAnswers";
import Answers from "../../services/Answers";
import "../styles/visiteur/My_results.css";
import { Link } from "react-router-dom";

const Myresult: React.FC = () => {
  const [results, setResults] = useState<ModelAnswers[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Utilisateur non connecté.");
        return;
      }

      try {
        const data = await Answers.ReadByUserId(userId);
        setResults(data);
      } catch (error) {
        setError("Erreur lors de la récupération des résultats");
      }
    };

    fetchResults();
  }, []);

  if (error) {
    return <div className="error-message-result">{error}</div>;
  }

  if (results.length === 0) {
    return (
      <div className="no-results-message-result">
        <p className="no-results-text">Aucun résultat trouvé.</p>
        <p className="no-results-text">
          Faites votre premier test{" "}
          <Link to="/visiteur/probleme" className="link-to-tests">
            ici
          </Link>
          .
        </p>
      </div>
    );
  }

  const groupedResults = Array.isArray(results)
    ? results.reduce((acc, result) => {
        const testId = result.question.test.id;
        if (!acc[testId]) {
          acc[testId] = {
            testTitle: result.question.test.title,
            answers: [],
          };
        }
        acc[testId].answers.push(result);
        return acc;
      }, {} as { [key: string]: { testTitle: string; answers: ModelAnswers[] } })
    : {};

  return (
    <div className="results-container-result">
      <h1 className="results-title-result">Résultats des utilisateurs</h1>
      {Object.keys(groupedResults).map((testId) => (
        <div key={testId} className="test-results-result">
          <h2 className="test-title-result">
            {groupedResults[testId].testTitle}
          </h2>
          <ul className="answers-list-result">
            {groupedResults[testId].answers.map((result) => (
              <li key={result.id} className="answer-item-result">
                <span>Question:</span> {result.question.title}
                <br />
                <span>Réponse donnée:</span> {result.content}
                <br />
                <span>Réponse correcte:</span> {result.question.pr}
                <br />
                <span>Est-ce correct:</span> {result.isvalid ? "Oui" : "Non"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Myresult;
