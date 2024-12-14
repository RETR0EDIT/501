import React, { useState } from "react";
import Accounts from "../services/Accounts";
import "./styles/signin.css";
import { useDarkMode } from "./utils/DarkModeContext";
import ModelAccount from "../models/ModelAccount";

/**
 * 
 *     id: number;
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    city: string;
    study: string;
    role: string;
    phone: string;
    image: string;
    createdat: Date;
    editedat: Date;
    valid: boolean;
    date: Date;
 */

const Signin = () => {
  var confirmPassword
  const { isDarkMode } = useDarkMode();
  const [accountData, setAccountData] = useState<ModelAccount>({
    id: 0,
    login: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    study: "",
    role: "USER",
    phone: "",
    image: "",
    createdat: new Date(),
    editedat: new Date(),
    valid: false,
    date: new Date(),
  });
  const [message, setMessage] = useState("");



  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "email" && { login: value }), // Met à jour login avec la valeur de email
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let trueAccountData = await Accounts.Create(accountData);
      /**
       * COOKIE de true account data
       */
      setMessage("Compte créé avec succès");
    } catch (err) {
      setMessage("Erreur lors de la création du compte");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="welcome-section">
          <div className="welcome-title">
            <h1>Bienvenue sur le site de la Journée porte ouverte </h1>
          </div>
          <div className="welcome-txt">
            <p>Connectez vous pour accéder à toutes les informations.</p>
          </div>
          <div className="div-signin-logo">
            <img
              src="/logo_login.svg"
              alt="Logo de création de compte"
              className="signin-logo"
            />
          </div>
        </div>
        <div className="signin-section">
          <div className="signin-ctn">
            <img
              src={isDarkMode ? "/signin_title_dark.svg" : "/signin_title.svg"}
              alt="Logo d'inscription"
              className="signin_form_title"
            />

            <form onSubmit={handleSubmit} className="signin-form">
              <div className="ctn-input">
                <div className="input-ctn">
                  <span className="signin-span">Prénom</span>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={accountData.firstname}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
                <div className="input-ctn">
                  <span className="signin-span">Nom</span>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Nom"
                    value={accountData.lastname}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>
              <div className="ctn-input">
                <div className="input-ctn">
                  <span className="signin-span">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={accountData.login}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
                <div className="input-ctn">
                  <span className="signin-span">Ville</span>
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={accountData.city}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>
              <div className="ctn-input">
                <div className="input-ctn filliere">
                  <span className="signin-span">Filière souhaitée</span>
                  <input
                    type="text"
                    name="study"
                    placeholder="Filière souhaitée"
                    value={accountData.study}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>
              <div className="ctn-input">
                <div className="input-ctn date">
                  <span className="signin-span">Date de naissance</span>
                  <input
                    type="date"
                    name="birthdate"
                    placeholder="Date de naissance"
                    value={accountData.date.toISOString().split('T')[0]}
                    onChange={handleChange}
                    required
                    className="signin-input"
                    id="date"
                  />
                  <img
                    className="calendrier"
                    src={
                      isDarkMode ? "/calendrier_dark.svg" : "/calendrier.svg"
                    }
                    alt=""
                  />
                </div>
                <div className="input-ctn tel">
                  <span className="signin-span">Téléphone</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={accountData.phone}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>
              <div className="ctn-input">
                <div className="input-ctn">
                  <span className="signin-span">Mot de passe</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={accountData.password}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
                <div className="input-ctn">
                  <span className="signin-span">Confirmer</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>

              <button type="submit" className="signin-button">
                S’inscrire
                <img
                  src={isDarkMode ? "/arrow_dark.svg" : "/arrow.svg"}
                  alt="Icone de création de compte"
                  className="signin-button-icon"
                />
              </button>
            </form>
            {message && <p className="signin-message">{message}</p>}
          </div>
        </div>
        <img src="/Elispe.svg" alt="" className="elipse" />
        <img src="/Elipse_2.svg" alt="" className="elipse_2" />
      </div>
    </div>
  );
};

export default Signin;