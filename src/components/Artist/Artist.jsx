import React from "react";
import Artwork from "../Artwork/Artwork";

const Artist = ({ name, position }) => {
  return (
    <group position={position}>
      <mesh>
        <textGeometry args={[name, { size: 1, height: 0.1 }]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <Artwork title="Artwork 1" position={[0, -1, 0]} />
      <Artwork title="Artwork 2" position={[1, -1, 0]} />
      <Artwork title="Artwork 3" position={[-1, -1, 0]} />
    </group>
  );
};

export default Artist;
