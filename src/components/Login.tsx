import React, { useState, useEffect, useRef } from "react";
import Accounts from "../services/Accounts";
import "./styles/login.css";
import { useDarkMode } from "./utils/DarkModeContext";
import Location from "./utils/Location";

const Login: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role");
    if (roleParam === "visiteur") {
      setShowLocation(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Accounts.Login(loginData);
      if (response) {
        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get("role");
        const currentDate = new Date();
        const targetDate = new Date("2024-12-17");

        // Comparer uniquement la date sans l'heure
        const isSameDate =
          currentDate.toISOString().split("T")[0] ===
          targetDate.toISOString().split("T")[0];

        // if (response.role === "USER") {
        //   if (roleParam !== "visiteur") {
        //     setMessage(
        //       "Vous n'êtes pas autorisé à vous connecter via ce lien."
        //     );
        //     return;
        //   }
        //   if (!isSameDate) {
        //     setMessage(
        //       "Vous n'êtes pas autorisé à vous connecter aujourd'hui."
        //     );
        //     return;
        //   }
        // }

        if (response.role === "PROF" && !response.validtoken) {
          setMessage("Votre compte n'a pas encore été validé.");
          return;
        }
        setMessage("Connexion réussie");
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userRole", response.role);
        localStorage.setItem("userToken", response.token);

        let baseUrl = window.location.origin;
        if (response.role === "PROF") {
          window.location.href = `${baseUrl}/professeur`;
        } else {
          window.location.href = `${baseUrl}/visiteur`;
        }
      } else {
        setMessage("Erreur lors de la connexion");
        console.log("Réponse de l'API", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMessage("Email ou mot de passe incorrect");
      } else {
        setMessage("Erreur lors de la connexion");
      }
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
          {showLocation && <Location />}
        </div>
      </div>
      <img src="/Elispe.svg" alt="" className="elipse" />
      <img src="/Elipse_2.svg" alt="" className="elipse_2" />
    </div>
  );
};

export default Login;
