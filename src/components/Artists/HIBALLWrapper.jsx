import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import HIBALL, { artworks } from "./HIBALL";
import HIBALLContent from "./HIBALLContent";

const HIBALLWrapper = ({ artworkSlug, handleClose }) => {
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
          <HIBALL />
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <OrbitControls />
      </Canvas>
      <HIBALLContent
        artworkSlug={artworkSlug}
        artworks={artworks}
        handleClose={handleClose}
      />
    </>
  );
};

export default HIBALLWrapper;
