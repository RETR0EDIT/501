import React from "react";
import ModelConference from "../../models/ModelConference";
import Conferences from "../../services/Conferences";
import { useEffect, useState } from "react";
import "../styles/visiteur/Conference.css";
export default function Conference() {
  const [ConferencesList, setConferencesList] = useState<ModelConference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await Conferences.Read();
        setConferencesList(response);
      } catch (err) {
        setError("Erreur lors de la récupération des conférences.");
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des conférences...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1 className="conftitle">Conférences</h1>
      <table className="conference-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Heure début</th>
            <th>Heure fin</th>
            <th>Salle</th>
            <th>Maître de conférence</th>
          </tr>
        </thead>
        <tbody>
          {ConferencesList.map((conference) => (
            <tr key={conference.id}>
              <td data-label="Titre">{conference.title}</td>
              <td data-label="Heure début">{conference.tstart}</td>
              <td data-label="Heure fin">{conference.tend}</td>
              <td data-label="Salle">{conference.room.name}</td>
              <td data-label="Maître de conférence">{conference.master}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
