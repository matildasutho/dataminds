import React, { useRef } from "react";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { Line, Text, Html } from "@react-three/drei";
import Labels from "./Labels";

const Node = ({
  position,
  scale = [1, 1, 1],
  label,
  children,
  onClick,
  rotate = true,
}) => {
  const ref = useRef();
  const textRef = useRef();

  return (
    <group position={position} ref={ref} scale={scale} onClick={onClick}>
      <RigidBody type="kinematicPosition" colliders={false}>
        <BallCollider args={[1]} />
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="cyan" metalness={0.48} roughness={0.4} />
        </mesh>
        <Labels label={label} />
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
            {React.cloneElement(child, { key: index })}
          </group>
        ))}
    </group>
  );
};

export default Node;
