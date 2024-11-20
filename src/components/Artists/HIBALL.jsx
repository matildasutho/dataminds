// RoyAnanda.jsx
import React from "react";
import Node from "../../Node";

function RoyAnanda({ onNodeClick, position }) {
  return (
    <Node
      position={position}
      label="HIBALL"
      scale={[0.75, 0.75, 0.75]}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          content: (
            <div>
              <h2>HIBALL</h2>
              <p>Biography text for HIBALL.</p>
            </div>
          ),
        });
      }}
    >
      <Node
        position={[
          Math.cos((1 / 3) * Math.PI * 2) * 2.2,
          Math.sin((1 / 3) * Math.PI * 2) * 2.2,
          0,
        ]}
        label="Artist Statement"
        scale={[1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick({
            type: "statement",
            content: (
              <div>
                <img
                  src="../../assets/Roy_Ananda/HIBALL_Evidence-Wall_crop-1.jpg"
                  alt="HIBALL"
                />
                <p>Statement text for HIBALL.</p>
              </div>
            ),
          });
        }}
      />
      <Node
        position={[
          Math.cos((2 / 3) * Math.PI * 2) * 2.2,
          Math.sin((2 / 3) * Math.PI * 2) * 2.2,
          0,
        ]}
        label="Artworks"
        scale={[1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick({
            type: "artwork",
            content: [
              <img
                src="../../assets/Roy_Ananda/artwork1.jpg"
                alt="Artwork 1"
              />,
              <img
                src="../../assets/Roy_Ananda/artwork2.jpg"
                alt="Artwork 2"
              />,
            ],
          });
        }}
      />
    </Node>
  );
}

export default RoyAnanda;
