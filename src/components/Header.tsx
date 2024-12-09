import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "./utils/DarkModeContext";
import "./styles/header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
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
            <Link to="/sign-in" className="nav-link" id="propos">
              À propos
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/visiteur" className="nav-link">
              visiteur
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/professeur" className="nav-link">
              professeur
            </Link>
          </li> */}
        </ul>
        <div className="auth-section">
          <div className="div-test">
            <ul className={`nav-list auth-nav ${isMenuOpen ? "open" : ""}`}>
              {!userRole && location.pathname !== "/sign-in" && (
                <li className="nav-item sign-in">
                  <Link to="/sign-in" className="nav-link">
                    S’inscrire
                  </Link>
                </li>
              )}

              {!userRole && location.pathname !== "/login" && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link" id="login-btn">
                    Se connecter
                  </Link>
                </li>
              )}
              {userRole && (
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
              )}
              {userRole && (
                <li className="nav-item" id="logout">
                  <a href="#" className="nav-link" onClick={handleLogout}>
                    <img
                      src={isDarkMode ? "/logout_dark.svg" : "/logout.svg"}
                      alt="Déconnexion"
                    />
                  </a>
                </li>
              )}
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

export default Header;
