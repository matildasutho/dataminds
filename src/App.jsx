import * as THREE from "three";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import MindMap from "./MindMap";
import Popup from "./components/Popup/Popup";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Instructions from "./components/Instructions/Instructions";
import "./App.css";

THREE.ColorManagement.legacyMode = false;

const App = () => {
  const [popupContent, setPopupContent] = useState(null);
  const [isRandomView, setIsRandomView] = useState(true);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      // Dynamically import and render the relevant artist component based on the slug
      const loadComponent = async () => {
        let component;
        switch (slug) {
          case "roy-ananda/evidence-wall":
            component = await import("./components/Artists/RoyAnanda");
            break;
          // Add more cases for other slugs
          default:
            component = null;
        }
        if (component) {
          setPopupContent({
            type: "artwork",
            artistName: "Roy Ananda",
            pageUrl: `/roy-ananda/evidence-wall`,
            content: component.default,
          });
        }
      };
      loadComponent();
    }
  }, [slug]);

  const handleNodeClick = (content) => {
    console.log("Node clicked:", content); // Debug statement
    setPopupContent(content);
    if (content.pageUrl) {
      navigate(content.pageUrl);
    }
  };

  const handleClosePopup = () => {
    console.log("Popup closed"); // Debug statement
    setPopupContent(null);
    navigate("/");
  };

  const toggleView = () => {
    setIsRandomView((prev) => !prev);
  };

  return (
    <>
      <Header />
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
      <Routes>
        <Route path="/" element={<div />} />
        <Route
          path="/:slug"
          element={<Popup content={popupContent} onClose={handleClosePopup} />}
        />
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
