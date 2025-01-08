import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import "./styles/RoomTour.css";

const IUTModel = () => {
  const { scene } = useGLTF("/assets/models/saeiut1.glb");
  return <primitive object={scene} />;
};

const RoomTour: React.FC = () => {
  const [view, setView] = useState("exterior");
  const controlsRef = useRef<any>();

  const positionMap = {
    exterior: new Vector3(-20, 20, 70),
    interior: new Vector3(-8, 2, 13),
    room: new Vector3(-63, 13, 5),
  };

  const targetMap = {
    exterior: new Vector3(0, 0, 0),
    interior: new Vector3(0, 0, 0),
    room: new Vector3(0, 0, 0),
  };

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.copy(positionMap[view]);
      controlsRef.current.target.copy(targetMap[view]);
      controlsRef.current.update();
    }
  }, [view]);

  return (
    <div className="room-tour">
      <div className="filter">
        <h2>Choisissez un point de vue</h2>
        <ul>
          <li
            className={view === "exterior" ? "active" : ""}
            onClick={() => setView("exterior")}
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

      <div className="canvas-container">
        <Canvas camera={{ position: [-20, 20, 70] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Suspense fallback={null}>
            <IUTModel />
          </Suspense>
          <OrbitControls ref={controlsRef} />
        </Canvas>
      </div>
    </div>
  );
};

export default RoomTour;
