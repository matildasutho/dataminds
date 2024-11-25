import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function TitleWithBaubles({ modelPath, children }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  useFrame((state, delta) => {
    if (modelRef.current) {
      // modelRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <group ref={modelRef}>
        {scene.children.map((child, index) => (
          <mesh
            key={index}
            geometry={child.geometry}
            material={child.material}
            scale={(1.8, 1.8, 1.8)}
            position={[0, 0, 0.75]}
          />
        ))}
        {children}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="cyan" metalness={0.48} roughness={0.4} />
        </mesh>
      </group>
    </>
  );
}

export default TitleWithBaubles;
