//mon compte
//stats
//monitoring
//Deconnexion
//Logo
//template
//mode eleves
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../utils/DarkModeContext";
import "../styles/visiteur/nav.css";

const NavProf = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <nav className={`header-nav ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      <div className="nav-ctn">
        <ul className={`nav-list main-nav ${isMenuOpen ? "open" : ""}`}>
          <li className="nav-item logo-item">
            <Link to="/">
              <img src="/logo_jpo.svg" alt="logo jpo" className="jpo_logo" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professeur" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professeur/Stats" className="nav-link">
              Stats
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professeur/template" className="nav-link">
              template
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professeur/monitoring" className="nav-link">
              monitoring
            </Link>
          </li>
        </ul>
        <div className="auth-section">
          <div className="div-test">
            <ul className={`nav-list auth-nav ${isMenuOpen ? "open" : ""}`}>
              <li className="nav-item" id="profils">
                <Link
                  to={
                    userRole === "professeur"
                      ? "/professeur/profils"
                      : "/visiteur/profils"
                  }
                  className="nav-link"
                >
                  <img
                    src={isDarkMode ? "/profils_dark.svg" : "/profils.svg"}
                    alt=""
                  />
                </Link>
              </li>

              <li className="nav-item" id="logout">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  <img
                    src={isDarkMode ? "/logout_dark.svg" : "/logout.svg"}
                    alt="Déconnexion"
                  />
                </a>
              </li>
            </ul>

            <button className="theme-toggle-button" onClick={toggleDarkMode}>
              <img
                src={isDarkMode ? "/moon.svg" : "/sun.svg"}
                alt={isDarkMode ? "Mode clair" : "Mode sombre"}
                className="theme-toggle"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavProf;
