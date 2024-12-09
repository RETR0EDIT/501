import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Contact from "./components/Contact.tsx";

import Login from "./components/Login.tsx";
import Signin from "./components/Singin.tsx";
import Home from "./components/Home.tsx";
import MyResults from "./components/visiteur/My_results";
import Probleme from "./components/visiteur/Probleme";
import RoomTour from "./components/visiteur/Room_tour";
import ErrorPage from "./components/visiteur/ErrorPage";
import Cursus from "./components/Cursus.tsx";
import HomeVisiteur from "./components/visiteur/Home.tsx";
import RouteVisiteur from "./components/visiteur/Route.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteProffeseur from "./components/professeur/Route.tsx";
import Monitoring from "./components/professeur/Monitoring";
import Stats from "./components/professeur/Stats";
import Template from "./components/professeur/Template";
import HomeProf from "./components/professeur/Home.tsx";
import ProfilsVisiteur from "./components/visiteur/ProfilsVisiteur.tsx";
import ProfilsProf from "./components/professeur/ProfilsProf.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Room-tour",
        element: <RoomTour />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/cursus",
        element: <Cursus />,
      },
      {
        path: "/visiteur",
        element: <RouteVisiteur />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/visiteur",
            element: <HomeVisiteur />,
          },

          {
            path: "my_results",
            element: <MyResults />,
          },
          {
            path: "probleme",
            element: <Probleme />,
          },
          {
            path: "room_tour",
            element: <RoomTour />,
          },
          {
            path: "cursus",
            element: <Cursus />,
          },

          {
            path: "profils",
            element: <ProfilsVisiteur />,
          },
        ],
      },
      {
        path: "/professeur",
        element: <RouteProffeseur />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/professeur",
            element: <HomeProf />,
          },

          {
            path: "Stats",
            element: <Stats />,
          },
          {
            path: "Monitoring",
            element: <Monitoring />,
          },
          {
            path: "Template",
            element: <Template />,
          },
          {
            path: "profils",
            element: <ProfilsProf />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
