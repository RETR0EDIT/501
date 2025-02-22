import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Accounts from "../services/Accounts";
import "./styles/signin.css";
import { useDarkMode } from "./utils/DarkModeContext";
import ModelAccount from "../models/ModelAccount";

const Signin = () => {
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
    phoneType: "fr",
    image: "",
    createdat: new Date(),
    editedat: new Date(),
    valid: false,
    date: new Date(),
    status: "",
    token: "",
    currentstudy: "",
    validtoken: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setAccountData((prevData) => ({
        ...prevData,
        [name]: value,
        ...(name === "email" && { login: value }),
      }));
    }
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setAccountData((prevData) => ({
        ...prevData,
        city: value,
      }));
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const phoneType = accountData.phoneType;

    if (phoneType === "fr") {
      // Validate French phone number (10 digits)
      if (/^\d{0,10}$/.test(value)) {
        setAccountData((prevData) => ({
          ...prevData,
          phone: value,
        }));
      }
    } else if (phoneType === "intl") {
      // Validate international phone number (up to 15 digits)
      if (/^\d{0,15}$/.test(value)) {
        setAccountData((prevData) => ({
          ...prevData,
          phone: value,
        }));
      }
    }
  };

  const handlePhoneTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setAccountData((prevData) => ({
      ...prevData,
      phoneType: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setAccountData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accountData.password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    if (
      accountData.role === "PROF" &&
      !accountData.login.endsWith("@univ-eiffel.fr") &&
      !accountData.login.endsWith("@edu.univ-eiffel.fr") //for test
    ) {
      setMessage(
        "Vous devez utiliser une adresse mail de l'université pour vous inscrire en tant que professeur"
      );
      return;
    }
    try {
      const token = uuidv4();
      const formattedDate =
        accountData.date instanceof Date
          ? accountData.date.toISOString()
          : new Date(accountData.date).toISOString();
      const accountDataWithToken = {
        ...accountData,
        token,
        date: formattedDate,
      };

      let trueAccountData = await Accounts.Create(accountDataWithToken);
      if (accountData.role === "PROF") {
        setMessage("Compte créé avec succès. Un email vous a été envoyé.");
      } else {
        setMessage("Compte créé avec succès");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("Adresse mail déjà utilisée");
      } else {
        setMessage("Erreur lors de la création du compte");
      }
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
                    onChange={handleNameChange}
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
                    onChange={handleNameChange}
                    required
                    className="signin-input"
                  />
                </div>
              </div>
              <div className={accountData.role === "PROF" ? "prof-class" : ""}>
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
                  {accountData.role !== "PROF" && (
                    <div className="input-ctn">
                      <span className="signin-span">Ville</span>
                      <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={accountData.city}
                        onChange={handleCityChange}
                        required
                        className="signin-input"
                      />
                    </div>
                  )}
                </div>
                <div className="ctn-input" id="role-study">
                  <div className="input-ctn statut">
                    <span className="signin-span">Statut</span>
                    <select
                      name="role"
                      value={accountData.role}
                      onChange={handleRoleChange}
                      required
                      className="signin-input"
                    >
                      <option value="USER">Étudiant</option>
                      <option value="PROF">Prof</option>
                      <option value="OTHER">Autre</option>
                    </select>
                    <img
                      className="select-icon"
                      src={isDarkMode ? "/select_dark.svg" : "/select.svg"}
                      alt=""
                    />
                  </div>
                  {accountData.role !== "PROF" && (
                    <div className="input-ctn filliere">
                      <span className="signin-span">Filière souhaitée</span>
                      <select
                        name="study"
                        value={accountData.study}
                        onChange={handleChange}
                        required
                        className="signin-input"
                      >
                        <option value="MMI">MMI</option>
                        <option value="GEA">GEA</option>
                        <option value="TC">TC</option>
                      </select>
                      <img
                        className="select-icon"
                        src={isDarkMode ? "/select_dark.svg" : "/select.svg"}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>

              {accountData.role !== "PROF" && (
                <div className="ctn-input" id="prof-study">
                  <div className="input-ctn" id="prof-studies">
                    <span className="signin-span">Etude en cours</span>
                    <input
                      type="text"
                      name="currentstudy"
                      placeholder="Etude en cours"
                      value={accountData.currentstudy}
                      onChange={handleChange}
                      required
                      className="signin-input currentstudy"
                    />
                  </div>
                </div>
              )}

              {accountData.role !== "PROF" && (
                <div className="ctn-input">
                  <div className="input-ctn date">
                    <span className="signin-span">Date de naissance</span>
                    <input
                      type="date"
                      name="date"
                      placeholder="Date de naissance"
                      value={
                        accountData.date
                          ? accountData.date.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                          setAccountData((prevData) => ({
                            ...prevData,
                            date: date,
                          }));
                        } else {
                          console.error("Invalid date value");
                        }
                      }}
                      required
                      className="signin-input"
                      id="date"
                      max={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 15)
                        )
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                    <img
                      className="calendrier"
                      src={
                        isDarkMode ? "/calendrier_dark.svg" : "/calendrier.svg"
                      }
                    />
                  </div>
                  <div className="input-ctn tel">
                    <span className="signin-span">Téléphone</span>
                    <div className="phone-input-container">
                      <select
                        name="phoneType"
                        value={accountData.phoneType}
                        onChange={handlePhoneTypeChange}
                        className="phone-type-select"
                      >
                        <option value="fr">+33</option>
                        <option value="intl">Autre</option>
                      </select>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Numéro de téléphone"
                        value={accountData.phone}
                        onChange={handlePhoneChange}
                        required
                        className="signin-input phone-input"
                      />
                    </div>
                  </div>
                </div>
              )}
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
            <div className="sign-in-message-ctn">
              {message && <p className="signin-message">{message}</p>}
            </div>
          </div>
        </div>
        <img src="/Elispe.svg" alt="" className="elipse" />
        <img src="/Elipse_2.svg" alt="" className="elipse_2" />
      </div>
    </div>
  );
};

export default Signin;
