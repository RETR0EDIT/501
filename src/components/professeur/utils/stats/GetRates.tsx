import React from "react";
import ModelRate from "../../../../models/ModelRate";
import Rates from "../../../../services/Rates";
import { useEffect, useState } from "react";
import "../../../styles/professeur/utils/stats/GetRates.css";
interface GetInfosProps {
  study: string;
}
const GetRates: React.FC<GetInfosProps> = ({ study }) => {
  const [RatesList, setRatesList] = useState<ModelRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await Rates.ReadByStudy(study);
        setRatesList(response);
      } catch (err) {
        setError("Erreur lors de la récupération des tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Prenom</td>
            <td>Question</td>
            <td>Note</td>
          </tr>
        </thead>
        <tbody>
          {RatesList.map((Rates) => (
            <tr key={Rates.account.id}>
              <td>{Rates.account.lastname}</td>
              <td>{Rates.account.lastname}</td>
              <td>{Rates.test.title}</td>
              <td>{Rates.note}/15</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default GetRates;
