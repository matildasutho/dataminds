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
  const [isRandomView, setIsRandomView] = useState(true);

  const handleNodeClick = (content) => {
    console.log("Node clicked:", content); // Debug statement
    setPopupContent(content);
    if (content.pageUrl) {
      window.history.pushState(null, "", content.pageUrl);
    }
  };

  const handleClosePopup = () => {
    console.log("Popup closed"); // Debug statement
    setPopupContent(null);
    window.history.pushState(null, "", "/");
  };

  const toggleView = () => {
    setIsRandomView((prev) => !prev);
  };

  useEffect(() => {
    if (popupContent && popupContent.pageUrl) {
      window.history.pushState(null, "", popupContent.pageUrl);
    }
  }, [popupContent]);

  return (
    <>
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <ambientLight intensity={0.38} />
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
          <MindMap onNodeClick={handleNodeClick} isRandomView={isRandomView} />
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
      <Footer isRandomView={isRandomView} toggleView={toggleView} />
      <Instructions />
    </>
  );
};

export default App;
