import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { useState, useEffect } from "react";
import ModelRate from "../../../../models/ModelRate";
import Rates from "../../../../services/Rates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GetChartsProps {
  study: string;
}

const GetCharts: React.FC<GetChartsProps> = ({ study }) => {
  const [RatesList, setRatesList] = useState<ModelRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noteList, setNoteList] = useState<number[]>([]);
  const [labelList, setLabelList] = useState<string[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await Rates.ReadByStudy(study);
        setRatesList(response);
        const notes = response.map((rate) => rate.note);
        setNoteList(notes);
        const labels = response.map((rate) => rate.test.title + " MMI ");
        setLabelList(labels);
      } catch (err) {
        setError("Erreur lors de la récupération des tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [study]);

  if (loading) {
    return <div className="loading">Chargement des tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const data = {
    labels: labelList,
    datasets: [
      {
        label: "Notes moyennes",
        data: noteList,
        backgroundColor: "#583E92",
        borderColor: "#fffff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    borderRadius: 16,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Graphique des notes moyennes pour la filière ${study}`,
        color: "#000",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000",
        },
      },
      y: {
        ticks: {
          color: "#000",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">
        Graphique des notes moyennes pour la filière {study}
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GetCharts;
