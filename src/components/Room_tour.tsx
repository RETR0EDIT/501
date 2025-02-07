import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import "./styles/RoomTour.css";

// Composant pour charger et afficher le modèle 3D
const IUTModel = () => {
  // Chargement de la scène GLTF à partir du fichier donné
  const { scene } = useGLTF("/assets/models/saeiut1.glb");
  // Utilisation du composant 'primitive' pour afficher directement l'objet Three.js
  return <primitive object={scene} />;
};

// Composant principal pour la visite virtuelle
const RoomTour: React.FC = () => {
  // État pour gérer la vue actuelle sélectionnée (exterior, interior, room)
  const [view, setView] = useState("exterior");

  // Référence pour accéder au contrôleur d'orbite (OrbitControls)
  const controlsRef = useRef<any>();

  // Positions prédéfinies de la caméra pour chaque vue
  const positionMap = {
	exterior: new Vector3(-20, 20, 70), // Vue extérieure
	interior: new Vector3(-8, 2, 13),  // Vue intérieure (accueil)
	room: new Vector3(-63, 13, 5), 	// Vue de la salle spécifique
  };

  // Cibles prédéfinies pour chaque vue (point vers lequel la caméra regarde)
  const targetMap = {
	exterior: new Vector3(0, 0, 0),
	interior: new Vector3(0, 0, 0),
	room: new Vector3(0, 0, 0),
  };

  // Effet pour mettre à jour la position et la cible de la caméra
  useEffect(() => {
	if (controlsRef.current) {
  	// Mise à jour de la position de la caméra en fonction de la vue sélectionnée
  	controlsRef.current.object.position.copy(positionMap[view]);
  	// Mise à jour de la cible de la caméra
  	controlsRef.current.target.copy(targetMap[view]);
  	// Application des modifications
  	controlsRef.current.update();
	}
  }, [view]); // Déclenché à chaque changement de 'view'

  return (
	<div className="room-tour">
  	{/* Section de filtres pour choisir la vue */}
  	<div className="filter">
    	<h2>Choisissez un point de vue</h2>
    	<ul>
      	<li
        	className={view === "exterior" ? "active" : ""} // Ajout d'une classe 'active' pour la vue actuelle
        	onClick={() => setView("exterior")} // Changement de vue lorsqu'on clique sur l'élément
      	>
        	Extérieur
      	</li>
      	<li
        	className={view === "interior" ? "active" : ""}
        	onClick={() => setView("interior")}
      	>
        	Accueil
      	</li>
      	<li
        	className={view === "room" ? "active" : ""}
        	onClick={() => setView("room")}
      	>
        	Salle
      	</li>
    	</ul>
  	</div>

  	{/* Conteneur pour afficher la scène 3D */}
  	<div className="canvas-container">
    	{/* Canvas de React Three Fiber pour gérer le rendu 3D */}
    	<Canvas camera={{ position: [-20, 20, 70] }}>
      	{/* Lumière ambiante pour éclairer la scène de manière uniforme */}
      	<ambientLight intensity={0.5} />
      	{/* Lumière directionnelle pour simuler une source lumineuse */}
      	<directionalLight position={[10, 10, 5]} />
      	{/* Chargement du modèle 3D avec un fallback pendant le chargement */}
      	<Suspense fallback={null}>
        	<IUTModel />
      	</Suspense>
      	{/* Contrôles d'orbite pour naviguer dans la scène 3D */}
      	<OrbitControls ref={controlsRef} />
    	</Canvas>
  	</div>
	</div>
  );
};

export default RoomTour;
