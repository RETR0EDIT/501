import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DarkModeProvider } from "./components/utils/DarkModeContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/visiteur/Nav";
import NavProf from "./components/professeur/Nav";
import Home from "./components/Home";

export default function App() {
  const location = useLocation();

  return (
    <DarkModeProvider>
      {location.pathname.startsWith("/visiteur") ? (
        <Nav />
      ) : location.pathname.startsWith("/professeur") ? (
        <NavProf />
      ) : (
        <Header />
      )}

      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </DarkModeProvider>
  );
}
