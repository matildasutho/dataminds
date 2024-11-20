import * as THREE from "three";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import MindMap from "./MindMap";
import Popup from "./components/Popup/Popup";
import Footer from "./components/Footer/Footer";
import Instructions from "./components/Instructions/Instructions";
import "./App.css";

THREE.ColorManagement.legacyMode = false;

export const App = () => {
  const [popupContent, setPopupContent] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleNodeClick = (content) => {
    console.log("Node clicked:", content); // Debug statement
    setPopupContent(content);
  };

  const handleClosePopup = () => {
    console.log("Popup closed"); // Debug statement
    setPopupContent(null);
  };

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseEnter = () => {
    document.querySelector(".custom-cursor").classList.add("hover");
  };

  const handleMouseLeave = () => {
    document.querySelector(".custom-cursor").classList.remove("hover");
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const clickableElements = document.querySelectorAll("button, a");
    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      />
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <ambientLight intensity={0.52} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[3.6, 5, 15]} intensity={4} />
        <directionalLight position={[0, -15, -0]} intensity={4} color="blue" />
        <Physics gravity={[0, 0, 0]}>
          <MindMap onNodeClick={handleNodeClick} />
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <EffectComposer disableNormalPass>
          <N8AO color="red" aoRadius={2} intensity={1.15} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
      {popupContent && (
        <Popup content={popupContent} onClose={handleClosePopup} />
      )}
      <Footer />
      <Instructions />
    </>
  );
};

export default App;
