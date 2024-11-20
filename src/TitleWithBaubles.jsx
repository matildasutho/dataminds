import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function TitleWithBaubles({ modelPath, children }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame((state, delta) => {
    if (modelRef.current) {
      //   modelRef.current.rotation.y += delta;
    }
  });

  return (
    <group ref={modelRef}>
      {scene.children.map((child, index) => (
        <mesh
          key={index}
          geometry={child.geometry}
          material={child.material}
          scale={(2.4, 2.4, 2.4)}
        />
      ))}
      {children}
    </group>
  );
}

export default TitleWithBaubles;
