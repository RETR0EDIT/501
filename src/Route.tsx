import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Contact from "./components/Contact.tsx";
import Conference from "./components/visiteur/Conference.tsx";
import Login from "./components/Login.tsx";
import Signin from "./components/Singin.tsx";
import Home from "./components/Home.tsx";
import MyResults from "./components/visiteur/My_results";
import Probleme from "./components/visiteur/Probleme";
import RoomTour from "./components/Room_tour.tsx";
import ErrorPage from "./components/visiteur/ErrorPage";
import Cursus from "./components/Cursus.tsx";
import CreaTest from "./components/professeur/CreaTest.tsx";
import RouteVisiteur from "./components/visiteur/Route.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteProffeseur from "./components/professeur/Route.tsx";

import Stats from "./components/professeur/Stats";
import Template from "./components/professeur/Template";

import ProfilsVisiteur from "./components/visiteur/ProfilsVisiteur.tsx";
import ProfilsProf from "./components/professeur/ProfilsProf.tsx";
import TemplateTest from "./components/visiteur/TemplateTest.tsx";
import ConferenceProf from "./components/professeur/Conference.tsx";
import Token from "./components/Token.tsx";
import Unauthorized from "./components/Unauthorized.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Template_1 from "./components/professeur/utils/template/Template_1.tsx";
import MentionsLegales from "./components/MentionsLegales.tsx";
import PolitiqueConfidentialite from "./components/PolitiqueConfidentialite.tsx";

const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

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
        path: "/verify/:token",
        element: <Token />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },

      {
        path: "/politique-confidentialite",
        element: <PolitiqueConfidentialite />,
      },
      {
        path: "/mentions-legales",
        element: <MentionsLegales />,
      },
      {
        path: "/visiteur",
        element: (
          <PrivateRoute
            element={<RouteVisiteur />}
            isAuthenticated={isAuthenticated()}
            requiredRoles={["USER", "OTHER"]}
          />
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/visiteur",
            element: <Home />,
          },
          {
            path: "templateTests/:idTest",
            element: <TemplateTest />,
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
          {
            path: "conference",
            element: <Conference />,
          },
        ],
      },
      {
        path: "/professeur",
        element: (
          <PrivateRoute
            element={<RouteProffeseur />}
            isAuthenticated={isAuthenticated()}
            requiredRoles="PROF"
          />
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/professeur",
            element: <Home />,
          },
          {
            path: "Stats",
            element: <Stats />,
          },

          {
            path: "Template",
            element: <Template />,
          },
          {
            path: "profils",
            element: <ProfilsProf />,
          },
          {
            path: "conference",
            element: <ConferenceProf />,
          },
          {
            path: "template_1",
            element: <Template_1 />,
          },
          {
            path: "creation-test",
            element: <CreaTest />,
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
