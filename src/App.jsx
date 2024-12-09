import React from "react";
import * as THREE from "three";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import MindMap from "./MindMap";
import Footer from "./components/Footer/Footer";
import Instructions from "./components/Instructions/Instructions";
import Header from "./components/Header/Header"; // Import the Header component
import ArtistPage from "./components/Artists/ArtistPage"; // Import the ArtistPage component
import Popup from "./components/Popup/Popup";
import "./App.css";

THREE.ColorManagement.legacyMode = false;

const App = () => {
  const [isRandomView, setIsRandomView] = useState(true);
  const [popupContent, setPopupContent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNodeClick = (content) => {
    // console.log("Node clicked:", content); // Debug statement
    setPopupContent(content);
    if (content.pageUrl) {
      navigate(content.pageUrl);
    }
  };

  const handleClosePopup = () => {
    // console.log("Popup closed"); // Debug statement
    setPopupContent(null);
    navigate("/");
  };

  useEffect(() => {
    const { pathname } = location;
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length === 2) {
      const [artistSlug, artworkSlug] = pathParts;
      const loadContent = async () => {
        const artistName = artistSlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("")
          .replace(/\s+/g, "");
        let component;
        try {
          component = await import(`./components/Artists/${artistName}Wrapper`);
        } catch (error) {
          console.error("Error loading component:", error);
          component = null;
        }

        if (component && component.default) {
          setPopupContent({
            type: "artwork",
            artistName,
            pageUrl: pathname,
            content: [
              React.createElement(component.default, {
                artworkSlug,
                key: pathname,
              }),
            ],
          });
        }
      };
      loadContent();
    }
  }, [location]);

  const toggleView = () => {
    setIsRandomView((prev) => !prev);
  };

  return (
    <>
      <Header /> {/* Include the Header component */}
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
        {isRandomView && <OrbitControls />}{" "}
        {/* Conditionally render OrbitControls */}
      </Canvas>
      {popupContent && (
        <Popup content={popupContent} onClose={handleClosePopup} />
      )}
      <Footer isRandomView={isRandomView} toggleView={toggleView} />
      <Instructions />
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/:artistSlug/:artworkSlug" element={<ArtistPage />} />
      </Routes>
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWithRouter;
