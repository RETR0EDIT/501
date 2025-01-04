import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../utils/DarkModeContext";
import "../styles/visiteur/nav.css";
import Auth from "../utils/Auth-nav";

const NavProf = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/professeur/conference" className="nav-link">
              Conférence
            </Link>
          </li>
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

export default NavProf;
