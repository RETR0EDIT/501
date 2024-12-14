import React, { useState, useEffect } from "react";
import Tests from "../../services/Tests";
import ModelTest from "../../models/ModelTest";
import { Link } from "react-router-dom";

export default function Probleme() {
  const [tests, setTests] = useState<ModelTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Chargement des tests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des Tests</h1>
      <ul>
        {tests.map((test) => (
          <Link
            to={`/visiteur/templateTests/${test.id}`}
            state={{ testName: test.title }}
            key={test.id}
          >
            <li>
              <h2>{test.title}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
("");
