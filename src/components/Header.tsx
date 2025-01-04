import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "./utils/DarkModeContext";
import "./styles/header.css";
import Auth from "./utils/Auth-nav";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const userRole = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`header-nav ${
        location.pathname === "/login" || location.pathname === "/sign-in"
          ? "login-page"
          : ""
      } ${isDarkMode ? "dark-mode" : ""}`}
    >
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      <div className="nav-ctn">
        <ul
          className={`nav-list main-nav ${isMenuOpen ? "open" : ""}`}
          id="login"
        >
          <li className="nav-item logo-item">
            <img src="/logo_jpo.svg" alt="logo jpo" className="jpo_logo" />
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/room-tour" className="nav-link" id="virtuel">
              Visite virtuelle
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cursus" className="nav-link">
              Cursus
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/#apropos-section" className="nav-link" id="propos">
              À propos
            </Link>
          </li>
          {(userRole === "OTHER" || userRole === "USER") && (
            <li className="nav-item">
              <Link to="/visiteur" className="nav-link">
                Visiteur
              </Link>
            </li>
          )}
          {userRole === "PROF" && (
            <li className="nav-item">
              <Link to="/professeur" className="nav-link">
                Professeur
              </Link>
            </li>
          )}
        </ul>
        <div className="auth-section">
          <div className="div-test">
            <Auth />
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

export default Header;
