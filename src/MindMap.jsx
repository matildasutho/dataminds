import React from "react";
import Node from "./Node";
import TitleWithBaubles from "./TitleWithBaubles";
import { Line } from "@react-three/drei";

import RoyAnanda from "./components/Artists/RoyAnanda";
import GirlOnRoad from "./components/Artists/GirlOnRoad";
import HIBALL from "./components/Artists/HIBALL";
import JonRafman from "./components/Artists/JonRafman";
import BrieTrenerry from "./components/Artists/BrieTrenerry";

function MindMap({ onNodeClick }) {
  const titlePosition = [0, 0, 0];
  const artistPositions = [
    [
      Math.cos((0 / 5) * Math.PI * 2) * 3.6,
      Math.sin((0 / 5) * Math.PI * 2) * 3.6,
      0,
    ],
    [
      Math.cos((1 / 5) * Math.PI * 2) * 3.6,
      Math.sin((1 / 5) * Math.PI * 2) * 3.6,
      0,
    ],
    [
      Math.cos((2 / 5) * Math.PI * 2) * 3.6,
      Math.sin((2 / 5) * Math.PI * 2) * 3.6,
      0,
    ],
    [
      Math.cos((3 / 5) * Math.PI * 2) * 3.6,
      Math.sin((3 / 5) * Math.PI * 2) * 3.6,
      0,
    ],
    [
      Math.cos((4 / 5) * Math.PI * 2) * 3.6,
      Math.sin((4 / 5) * Math.PI * 2) * 3.6,
      0,
    ],
  ];

  return (
    <>
      <group>
        <TitleWithBaubles modelPath="title_dm.gltf">
          <group>
            <Line
              points={[titlePosition, artistPositions[0]]}
              color="cyan"
              lineWidth={1}
            />
            <RoyAnanda
              onNodeClick={onNodeClick}
              position={artistPositions[0]}
            />
          </group>
          <group>
            <Line
              points={[titlePosition, artistPositions[1]]}
              color="cyan"
              lineWidth={1}
            />
            <GirlOnRoad
              onNodeClick={onNodeClick}
              position={artistPositions[1]}
            />
          </group>
          <group>
            <Line
              points={[titlePosition, artistPositions[2]]}
              color="cyan"
              lineWidth={1}
            />
            <HIBALL onNodeClick={onNodeClick} position={artistPositions[2]} />
          </group>
          <group>
            <Line
              points={[titlePosition, artistPositions[3]]}
              color="cyan"
              lineWidth={1}
            />
            <JonRafman
              onNodeClick={onNodeClick}
              position={artistPositions[3]}
            />
          </group>
          <group>
            <Line
              points={[titlePosition, artistPositions[4]]}
              color="cyan"
              lineWidth={1}
            />
            <BrieTrenerry
              onNodeClick={onNodeClick}
              position={artistPositions[4]}
            />
          </group>
        </TitleWithBaubles>
      </group>
    </>
  );
}

export default MindMap;
