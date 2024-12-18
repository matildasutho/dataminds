import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import MindMap from "../MindMap";
import Footer from "../components/Footer/Footer";
import Instructions from "../components/Instructions/Instructions";
import Header from "../components/Header/Header";
import "./CanvasPage.css";

THREE.ColorManagement.legacyMode = false;

const CanvasPage = ({ artists, handleNodeClick, isRandomView }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "c") {
        captureCanvas();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const captureCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas_capture.png";
      link.click();
    }
  };

  return (
    <>
      <Header />
      <Canvas
        ref={canvasRef}
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
          <MindMap
            artists={artists}
            onNodeClick={handleNodeClick}
            isRandomView={isRandomView}
          />
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <EffectComposer disableNormalPass>
          <N8AO color="red" aoRadius={2} intensity={1.15} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
      <Instructions />
    </>
  );
};

export default CanvasPage;
