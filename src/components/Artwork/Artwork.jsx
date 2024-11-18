import React from "react";
import * as THREE from "three";
import "./Artwork.css";

const Artwork = ({ title, position }) => {
  return (
    <group position={position}>
      <mesh>
        <TextGeometry args={[title, { size: 0.5, height: 0.1 }]} />
        <meshBasicMaterial color="gray" />
      </mesh>
    </group>
  );
};

export default Artwork;
