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

  useFrame(() => {
    if (ref.current && rotate) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={position} ref={ref} scale={scale} onClick={onClick}>
      <RigidBody type="kinematicPosition" colliders={false}>
        <BallCollider args={[1]} />
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="cyan" metalness={0.48} roughness={0.4} />
        </mesh>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.2}
          color="blue"
          anchorX="center"
          anchorY="middle"
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
            {child}
          </group>
        ))}
    </group>
  );
}

export default Node;
