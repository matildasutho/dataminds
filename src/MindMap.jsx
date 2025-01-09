import React, { useState, useEffect, useRef } from "react";
import { Line } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import TitleWithBaubles from "./TitleWithBaubles";
import Node from "./Node"; // Import the Node component
import { fetchData } from "./fetchContentful"; // Import the fetch function

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const MindMap = ({ onNodeClick }) => {
  const [artists, setArtists] = useState([]);
  const [artistPositions, setArtistPositions] = useState([]);
  const titlePosition = [0, 0, 0];
  const radius = 3.6;
  const minDistance = 2.0; // Minimum distance between artists
  const maxDistance = 5.5; // Maximum distance from the title
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await fetchData();
        // console.log("Fetched artists data:", data.artistCollection.items);
        setArtists(data.artistCollection.items);
      } catch (error) {
        // console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    if (artists.length > 0) {
      const positions = [];
      for (let i = 0; i < artists.length; i++) {
        const pos = generatePosition(positions);
        // console.log(
        //   `Generated position for artist ${artists[i].artistName}:`,
        //   pos
        // );
        positions.push(pos);
      }
      setArtistPositions(positions);
    }
  }, [artists]);

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

  const positions = artistPositions;

  return (
    <group>
      <TitleWithBaubles modelPath="/title_dm.gltf">
        {positions.map((position, index) => {
          const artist = artists[index];
          if (!artist) {
            // console.error(`Artist at index ${index} is undefined`);
            return null;
          }
          const artistSlug = generateSlug(artist.artistName);
          // console.log(
          //   `Rendering node for artist ${artist.artistName} at position:`,
          //   position
          // );
          return (
            <group key={artist.artistName}>
              <Line
                points={[titlePosition, position]}
                color="cyan"
                lineWidth={1}
              />
              <Node
                position={position}
                label={artist.artistName}
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeClick({
                    type: "biography",
                    artistName: artist.artistName,
                    pageUrl: `/${artistSlug}`,
                    content: [
                      <p
                        dangerouslySetInnerHTML={{
                          __html: artist.artistBiography.json,
                        }}
                      />,
                    ],
                  });
                }}
              >
                {artist.artworksCollection.items.map(
                  (artwork, artworkIndex) => {
                    const artworkSlug = generateSlug(artwork.title);
                    const artworkPosition = [
                      Math.cos(
                        (artworkIndex /
                          artist.artworksCollection.items.length) *
                          Math.PI *
                          2
                      ) * 2.8,
                      Math.sin(
                        (artworkIndex /
                          artist.artworksCollection.items.length) *
                          Math.PI *
                          2
                      ) * 2.8,
                      0,
                    ];
                    return (
                      <Node
                        key={artwork.sys.id}
                        position={artworkPosition}
                        label={artwork.title}
                        scale={[1, 1, 1]}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNodeClick({
                            type: "artwork",
                            artistName: artist.artistName,
                            pageUrl: `/${artistSlug}/${artworkSlug}`,
                          });
                        }}
                      />
                    );
                  }
                )}
              </Node>
            </group>
          );
        })}
      </TitleWithBaubles>
    </group>
  );
};

export default MindMap;
