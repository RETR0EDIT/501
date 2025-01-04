import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, requiredRole }) => {
  const userRole = localStorage.getItem("userRole"); // Assurez-vous que le rôle de l'utilisateur est stocké dans le localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />; // Redirigez vers une page non autorisée si le rôle ne correspond pas
  }

  return element;
};

export default PrivateRoute;
