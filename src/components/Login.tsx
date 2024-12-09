import React, { useState, useEffect, useRef } from "react";
import Accounts from "../services/Accounts";
import "./styles/login.css";
import { useDarkMode } from "./utils/DarkModeContext";

const Login: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Accounts.Login(loginData);
      if (response) {
        setMessage("Connexion réussie");
        localStorage.setItem("userRole", response.role); // Enregistre le rôle dans localStorage
        if (response.role === "professeur") {
          window.location.href = "http://localhost:5173/professeur";
        } else {
          window.location.href = "http://localhost:5173/visiteur";
        }
      } else {
        setMessage("Erreur lors de la connexion");
        console.log("Réponse de l'API", response);
      }
    } catch (err) {
      setMessage("Erreur lors de la connexion");
      console.error("Erreur lors de la connexion", err);
    }
  };

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && titleElement.scrollHeight > titleElement.clientHeight) {
      titleElement.classList.add("shrink");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="welcome-section">
        <div className="welcome-title">
          <h1 ref={titleRef}>
            Bienvenue sur le site de la Journée porte ouverte
          </h1>
        </div>
        <div className="welcome-txt">
          <p>Connectez-vous pour accéder à toutes les informations.</p>
        </div>
        <div className="div-login-logo">
          <img
            src="/logo_login.svg"
            alt="Logo de connexion"
            className="login-logo"
          />
        </div>
      </div>
      <div className="login-section">
        <div className="login-ctn">
          <img
            src={isDarkMode ? "/login_title_dark.svg" : "/login_title.svg"}
            alt="Logo de connexion"
            className="login_form_title"
          />

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-ctn">
              <span className="login-span">E-mail</span>
              <input
                type="text"
                name="login"
                placeholder="Exemple@gmail.com"
                value={loginData.login}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
            <div className="input-ctn">
              <span className="login-span">Mot de passe</span>
              <input
                type="password"
                name="password"
                placeholder="***************"
                value={loginData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>

            <button type="submit" className="login-button">
              Se connecter
              <img
                src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                alt="Icone de connexion"
                className="login-button-icon"
              />
            </button>
          </form>
          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
      <img src="/Elispe.svg" alt="" className="elipse" />
      <img src="/Elipse_2.svg" alt="" className="elipse_2" />
    </div>
  );
};

export default Login;
