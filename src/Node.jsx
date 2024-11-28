import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { Text, Line } from "@react-three/drei";

function Node({
  position,
  label,
  children,
  scale = [1, 1, 1],
  onClick,
  rotate = true,
}) {
  const ref = useRef();
  const textRef = useRef();

  // useFrame(() => {
  //   if (ref.current) {
  //     if (rotate) {
  //       ref.current.rotation.y += 0.001;
  //     } else {
  //       ref.current.rotation.y = 0; // Reset rotation to flat position
  //     }
  //   }
  //   if (textRef.current) {
  //     if (!rotate) {
  //       textRef.current.rotation.y = 0; // Reset rotation to flat position
  //     }
  //   }
  // });

  return (
    <group position={position} ref={ref} scale={scale} onClick={onClick}>
      <RigidBody type="kinematicPosition" colliders={false}>
        <BallCollider args={[1]} />
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="cyan" metalness={0.48} roughness={0.4} />
        </mesh>
        <Text
          ref={textRef}
          position={[-0.1, 0.2, 0]}
          fontSize={0.175}
          lineHeight={1.2}
          color="blue"
          anchorX="right"
          anchorY="middle"
          textAlign="left"
          textDecoration="underline"
          font="/Arial.ttf"
        >
          {label}
        </Text>
      </RigidBody>
      {children &&
        React.Children.map(children, (child, index) => (
          <group key={index}>
            <Line
              points={[
                [0, 0, 0],
                [
                  child.props.position[0],
                  child.props.position[1],
                  child.props.position[2],
                ],
              ]}
              color="cyan"
              lineWidth={1}
            />
            {React.cloneElement(child, { rotate })}
          </group>
        ))}
    </group>
  );
}

export default Node;
