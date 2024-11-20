import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "../../assets/Brie_Trenerry/Trip_Code/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "../../assets/Brie_Trenerry/Mis_Dis/*.{png,jpg,jpeg,svg}"
);
const artwork3 = import.meta.glob(
  "../../assets/Brie_Trenerry/Yard_Installation/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  { name: "Trip Code", images: Object.values(artwork1) },
  { name: "Mis Dis", images: Object.values(artwork2) },
  { name: "Yard Installation", images: Object.values(artwork3) },
];

function BrieTrenerry({ onNodeClick, position }) {
  const [loadedArtworks, setLoadedArtworks] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        artworks.map(async (artwork) => {
          const images = await Promise.all(
            Object.values(artwork.images).map(async (importFn) => {
              const module = await importFn();
              return module.default;
            })
          );
          return { ...artwork, images };
        })
      );
      setLoadedArtworks(loaded);
    };

    loadImages();
  }, []);

  return (
    <Node
      position={position}
      label="Brie Trenerry"
      scale={[0.75, 0.75, 0.75]}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          content: (
            <div>
              <h2>Brie Trenerry</h2>
              <p>Biography text for Brie Trenerry.</p>
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
                  src="../../assets/Girl_On_Road/image1.jpg"
                  alt="Brie Trenerry"
                />
                <p>Statement text for Brie Trenerry.</p>
              </div>
            ),
          });
        }}
      />
      {loadedArtworks.map((artwork, index) => (
        <Node
          key={artwork.name}
          position={[
            Math.cos((index / loadedArtworks.length) * Math.PI * 2) * 2.2,
            Math.sin((index / loadedArtworks.length) * Math.PI * 2) * 2.2,
            0,
          ]}
          label={artwork.name}
          scale={[1, 1, 1]}
          onClick={(e) => {
            e.stopPropagation();
            onNodeClick({
              type: "artwork",
              content: artwork.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`${artwork.name} ${imgIndex + 1}`}
                />
              )),
            });
          }}
        />
      ))}
    </Node>
  );
}

export default BrieTrenerry;
