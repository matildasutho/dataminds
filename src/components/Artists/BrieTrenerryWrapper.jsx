import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import BrieTrenerry, { artworks } from "src/components/Artists/BrieTrenerry";
import BrieTrenerryContent from "src/components/Artists/BrieTrenerryContent";

const BrieTrenerryWrapper = ({ artworkSlug, handleClose }) => {
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
          <BrieTrenerry />
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <OrbitControls />
      </Canvas>
      <BrieTrenerryContent
        artworkSlug={artworkSlug}
        artworks={artworks}
        handleClose={handleClose}
      />
    </>
  );
};

export default BrieTrenerryWrapper;
