import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../utils/DarkModeContext";

export default function Auth() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
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
            id="prof"
            to={
              userRole === "PROF" ? "/professeur/profils" : "/visiteur/profils"
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
  );
}
