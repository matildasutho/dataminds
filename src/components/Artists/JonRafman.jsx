import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "../../assets/Jon_Rafman/Panic/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "../../assets/Jon_Rafman/Punctured_Sky/*.{png,jpg,jpeg,svg}"
);
const artwork3 = import.meta.glob(
  "../../assets/Jon_Rafman/Riot_In_The_Mall_Parking_Lot/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "Panic on the Beach",
    images: Object.values(artwork1),
    text: "Jon Rafman, <em>Panic on the Beach</em>, 2023.<br>Inkjet print and acrylic on canvas, 187 x 135 cm<br><br>© Jon Rafman 2024<br>Courtesy the artist, Neon Parc and Sprüth Magers",
  },
  {
    name: "Punctured Sky",
    images: Object.values(artwork2),
    text: "Jon Rafman, <em>Punctured Sky</em>, 2021.<br>4K video, stereo sound, 21:09 min.<br>© Jon Rafman 2024<br>Courtesy the artist, Neon Parc and Sprüth Magers",
  },
  {
    name: "Riot In The Mall Parking Lot",
    images: Object.values(artwork3),
    text: "Jon Rafman, <em>𐤌𐤄𐤅𐤌𐤄𐤟𐤁𐤇𐤍𐤉𐤅𐤍𐤟𐤄𐤒𐤍𐤉𐤅𐤍 (Riot in the Mall Parking Lot)</em>, 2023.<br>Inkjet print and acrylic on canvas, 187 x 135 cm<br><br>© Jon Rafman 2024<br>Courtesy the artist, Neon Parc and Sprüth Magers",
  },
];

function JonRafman({ onNodeClick, position }) {
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
      label="Jon Rafman"
      scale={[0.75, 0.75, 0.75]}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "Jon Rafman",
          content: (
            <div>
              <h2>Jon Rafman</h2>
              <p>Biography text for Jon Rafman.</p>
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
            artistName: "Jon Rafman",
            content: (
              <div>
                <img
                  src="../../assets/Jon_Rafman/image1.jpg"
                  alt="Jon Rafman"
                />
                <p>Statement text for Jon Rafman.</p>
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
              artistName: "Jon Rafman",
              content: [
                ...artwork.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${artwork.name} ${imgIndex + 1}`}
                  />
                )),
                <p
                  key="text"
                  dangerouslySetInnerHTML={{ __html: artwork.text }}
                />,
              ],
            });
          }}
        />
      ))}
    </Node>
  );
}

export default JonRafman;
