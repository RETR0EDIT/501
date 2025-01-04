import React from "react";
import { useState, useEffect } from "react";
import Accounts from "../../../../services/Accounts";
import ModelAccount from "../../../../models/ModelAccount";
import "../../../styles/professeur/utils/stats/GetInfos.css";

interface GetInfosProps {
  study: string;
}

const GetInfos: React.FC<GetInfosProps> = ({ study }) => {
  const [AccountsList, setAccountsList] = useState<ModelAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await Accounts.ReadByStudy(study);
        setAccountsList(response);
      } catch (err) {
        setError("Erreur lors de la récupération des tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchInfos();
  }, [study]);

  if (loading) {
    return <div className="loading">Chargement des tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="infos-container">
      <table className="infos-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {AccountsList.map((account) => (
            <tr key={account.id}>
              <td data-label="Image">
                <img
                  src={
                    account.image
                      ? `http://localhost:8080/uploads/${account.image}`
                      : "/default.svg"
                  }
                  alt={account.lastname}
                  className="avatar"
                />
              </td>
              <td data-label="Nom">{account.lastname}</td>
              <td data-label="Prenom">{account.firstname}</td>
              <td data-label="Email">{account.login}</td>
              <td data-label="Statut">{account.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetInfos;
