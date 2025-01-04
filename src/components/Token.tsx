import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Accounts from "../services/Accounts";

const Token = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification en cours...");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await Accounts.VerifyToken(token);
        if (response.valid) {
          // Stocker les informations de l'utilisateur dans le local storage
          localStorage.setItem("userId", response.user.id);
          localStorage.setItem("userRole", response.user.role);
          localStorage.setItem("userToken", token);
          setMessage("Connexion réussie !");

          // Rediriger l'utilisateur en fonction de son rôle
          if (response.user.role === "PROF") {
            navigate("/professeur");
          } else {
            navigate("/visiteur");
          }
        } else {
          setMessage("Token invalide ou expiré.");
        }
      } catch (error) {
        setMessage("Erreur lors de la vérification du token.");
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="token-page">
      <h1>{message}</h1>
    </div>
  );
};

export default Token;