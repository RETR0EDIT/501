import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Accounts from "../../services/Accounts";
import GetInfos from "./utils/stats/GetInfos";
import GetCharts from "./utils/stats/GetCharts";
import GetRates from "./utils/stats/GetRates";
import "../styles/professeur/Stats.css";

export default function Stats() {
  const [studies, setStudies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [study, setStudy] = useState<string>("MMI");
  const [study2, setStudy2] = useState<string>("MMI");
  const [action, setAction] = useState<string>("Infos");
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedStudy2, setSelectedStudy2] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>("Infos");
  const [showActions, setShowActions] = useState<boolean>(true);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await Accounts.Studies();
        setStudies(response);
        if (response.length > 0) {
          setSelectedStudy(response[0]);
          setStudy(response[0]);
        }
      } catch (err) {
        setError("Erreur lors de la récupération des tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!showActions && actionsRef.current) {
      gsap.to(actionsRef.current, {
        x: -400,
        duration: 1,
        display: "none",
        zIndex: -1,
        onUpdate: () => {
          gsap.to(".results-container", {
            width: "100%",
            duration: 1,
          });
        },
      });
    } else if (showActions && actionsRef.current) {
      gsap.to(actionsRef.current, {
        x: 0,
        duration: 1,
        display: "flex",
        zIndex: 1,
        onUpdate: () => {
          gsap.to(".results-container", {
            width: "calc(100% - 400px)",
            duration: 1,
          });
        },
      });
    }
  }, [showActions]);

  if (loading) {
    return <div className="loading">Chargement des tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleStudyClick = (study: string) => {
    if (selectedStudy === study) {
      setShowActions(!showActions);
    } else {
      setStudy(study);
      setSelectedStudy(study);
      setShowActions(true);
    }
  };

  const handleStudyClick2 = (study: string) => {
    setStudy2(study);
    setSelectedStudy2(study);
  };

  const handleActionClick = (action: string) => {
    setAction(action);
    setSelectedAction(action);
  };

  return (
    <div className="stats-container">
      <div className="studies-buttons">
        {studies.map((study, index) => (
          <div
            key={index}
            onClick={() => handleStudyClick(study)}
            className={`background-button ${
              selectedStudy === study ? "selected" : ""
            }`}
          >
            <button
              onClick={() => handleStudyClick(study)}
              className={`study-button`}
            >
              {study}
            </button>
          </div>
        ))}
      </div>

      <div ref={actionsRef} className="actions-buttons">
        <button
          onClick={() => handleActionClick("Infos")}
          className={`action-button ${
            selectedAction === "Infos" ? "selected-type" : ""
          }`}
        >
          Voir les informations sur les futurs étudiants
        </button>
        <div className="trait"></div>
        <button
          onClick={() => handleActionClick("Resultats")}
          className={`action-button ${
            selectedAction === "Resultats" ? "selected-type" : ""
          }`}
        >
          Voir les résultats de chaque personne
        </button>
        <div className="trait"></div>
        <button
          onClick={() => handleActionClick("Taux")}
          className={`action-button ${
            selectedAction === "Taux" ? "selected-type" : ""
          }`}
        >
          Taux de réussite de chaque questions
        </button>
        <div className="trait"></div>
      </div>

      <div className="results-container">
        {action === "Infos" && <GetInfos key={study} study={study} />}
        {action === "Resultats" && <GetRates key={study} study={study} />}
        {action === "Taux" && <GetCharts key={study} study={study} />}
      </div>
    </div>
  );
}
