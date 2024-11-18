import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls, OrbitControls } from "@react-three/drei";
import Artist from "../Artist/Artist";
import "./Mindmap.css";

const MindMap = () => {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <OrbitControls />
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 5, 5]} intensity={8} />
      <ScrollControls damping={2} pages={5}>
        <Scroll html>
          <div
          >
            <h1>Data Minds</h1>
          </div>
          <Artist name="Artist 1" position={[0, -2, 0]} />
          <Artist name="Artist 2" position={[2, -2, 0]} />
          <Artist name="Artist 3" position={[-2, -2, 0]} />
        </Scroll>
      </ScrollControls>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="cyan" metalness={0.7} roughness={0.3} />
      </mesh>
    </Canvas>
  );
};

export default MindMap;
