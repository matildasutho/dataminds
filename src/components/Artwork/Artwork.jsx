import React from "react";
import "./Artwork.css";

const Artwork = ({ title, position }) => {
  return (
    <group position={position}>
      <mesh>
        <textGeometry args={[title, { size: 0.5, height: 0.1 }]} />
        <meshBasicMaterial color="gray" />
      </mesh>
    </group>
  );
};

export default Artwork;
