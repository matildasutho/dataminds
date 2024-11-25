import { extend } from "@react-three/fiber";
import { Line } from "@react-three/drei";

import React, { useState } from "react";
import TitleWithBaubles from "./TitleWithBaubles";
import RoyAnanda from "./components/Artists/RoyAnanda";
import GirlOnRoad from "./components/Artists/GirlOnRoad";
import HIBALL from "./components/Artists/HIBALL";
import JonRafman from "./components/Artists/JonRafman";
import BrieTrenerry from "./components/Artists/BrieTrenerry";
import DataMinds from "./components/Artists/DataMinds";

// Extend the THREE namespace to include the Line component
extend({ Line });

function MindMap({ onNodeClick, isRandomView }) {
  const titlePosition = [0, 0, 0];
  const numArtists = 6;
  const radius = 3.6;
  const minDistance = 2.0; // Minimum distance between artists
  const maxDistance = 5.0; // Maximum distance from the title

  const generatePosition = (existingPositions) => {
    let position;
    let isValid = false;

    while (!isValid) {
      const angle = Math.random() * Math.PI * 2;
      const multiple = Math.random() * 2 + 1; // Random multiple between 1 and 3
      position = [
        Math.cos(angle) * radius * multiple,
        Math.sin(angle) * radius * multiple,
        Math.sin(angle) * radius * multiple,
      ];

      const distanceFromTitle = Math.sqrt(
        Math.pow(position[0] - titlePosition[0], 2) +
          Math.pow(position[1] - titlePosition[1], 2) +
          Math.pow(position[2] - titlePosition[2], 2)
      );

      isValid =
        distanceFromTitle <= maxDistance &&
        existingPositions.every((pos) => {
          const distance = Math.sqrt(
            Math.pow(pos[0] - position[0], 2) +
              Math.pow(pos[1] - position[1], 2) +
              Math.pow(pos[2] - position[2], 2)
          );
          return distance >= minDistance;
        });
    }

    return position;
  };

  const [artistPositions] = useState(() => {
    const positions = [];
    for (let i = 0; i < numArtists; i++) {
      positions.push(generatePosition(positions));
    }
    return positions;
  });

  const flatPositions = Array.from({ length: numArtists }, (_, index) => [
    Math.cos((index / numArtists) * Math.PI * 2) * radius,
    Math.sin((index / numArtists) * Math.PI * 2) * radius,
    0,
  ]);

  const positions = isRandomView ? artistPositions : flatPositions;

  return (
    <group>
      <TitleWithBaubles modelPath="/title_dm.gltf">
        {positions.map((position, index) => (
          <group key={index}>
            <Line
              points={[titlePosition, position]}
              color="cyan"
              lineWidth={1}
            />
            {index === 0 && (
              <RoyAnanda
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
            {index === 1 && (
              <GirlOnRoad
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
            {index === 2 && (
              <HIBALL
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
            {index === 3 && (
              <JonRafman
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
            {index === 4 && (
              <BrieTrenerry
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
            {index === 5 && (
              <DataMinds
                onNodeClick={onNodeClick}
                position={position}
                rotate={isRandomView}
              />
            )}
          </group>
        ))}
      </TitleWithBaubles>
    </group>
  );
}

export default MindMap;
