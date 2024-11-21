import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/Girl_On_Road/cipher/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "./assets/Girl_On_Road/bit_plane_5/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "cipher",
    images: Object.values(artwork1),
    text: "Girl On Road, <em>dirtstyle: cipher</em>, 2024.<br><br>Dirt, Apple Cinema Display, Apple Mac Mini, Apple Magic Mouse, sound, petrichor",
  },
  {
    name: "bit plane 5",
    images: Object.values(artwork2),
    text: "Girl On Road, <em>dirtstyle: bit plane 5</em>, 2024.<br><br>Dirt, digital print on 80gsm paper",
  },
];

function GirlOnRoad({ onNodeClick, position, rotate }) {
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

  const totalNodes = loadedArtworks.length + 1; // Total number of artworks + 1 statement
  const angleStep = (2 * Math.PI) / totalNodes;

  return (
    <Node
      position={position}
      label="Girl On Road"
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "Girl On Road",
          content: (
            <div>
              <img src="./assets/Girl_On_Road/image1.jpg" alt="Girl On Road" />
              <p>
                Girl On Road (GOR) is the creative studio and record label of
                Melbourne-based artist, Matilda Sutherland. Through code,
                design, installation, and sound, GOR explores the extent to
                which we are embedded in a hyper-digitised age. As a label, GOR
                houses underground and experimental music releases, and hosts
                live events. Each GOR project is an exercise in world
                building—traversing mediums, screens and stages—all in a bid to
                re-wild the technosphere. GOR’s most recent body of work,{" "}
                <em>The Cowgirl Manifesto</em>, has been presented in different
                forms at Hybrid Live Coding Interfaces, (Montreal, 2021), Runway
                Journal (Digital Publication, 2022), The International
                Conference for Live Coding (Utrecht, 2023).
                <br />
                <br />
                <a href="https://girlonroad.tech/" target="_blank">
                  https://girlonroad.tech/
                </a>
                <br />
                <a href="https://www.matildasutherland.com/" target="_blank">
                  https://www.matildasutherland.com/
                </a>
                <br />
                <a
                  href="https://www.instagram.com/girlonroad.tech"
                  target="_blank"
                >
                  @girlonroad.tech
                </a>
              </p>
            </div>
          ),
        });
      }}
    >
      <Node
        position={[
          Math.cos(angleStep * 0) * 2.2,
          Math.sin(angleStep * 0) * 2.2,
          0,
        ]}
        label="Artist Statement"
        scale={[1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick({
            type: "statement",
            artistName: "Girl On Road",
            content: (
              <div>
                <img
                  src="../../assets/Girl_On_Road/image1.jpg"
                  alt="Jon Rafman"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: `
                      Girl On Road explores the compostability of digital imagery via generative coding practices, building upon her ongoing work <em>dirtstyle</em>. Inspired by Daniel Temkin's esoteric programming language, 'Entropy'*,* dirt*styl*e is a text-based net.art piece which ‘erodes’ over time. Within the ethos of dirt*style* is the idea of approaching technology with the same acceptance of unpredictability, and ephemerality with which we approach the natural world.
<br><br>
In this iteration, Girl On Road explores new technologies within the themes of transparency of computational processes, erosion and the compostability of digital matter, doing so on an expanded scale beyond the home computer screen. 
<br><br>
In the heritage listed cells of The Lock-Up, dirt*style* takes over the senses. Running on the king of planned obsolescence brand products (Apple), is a script which decomposes images into bit planes (vessels), only to recombine them and encrypt the resulting bit planes within each other (ciphers). The imagery consists of found material from the artists own archives, and web scraped media detritus. In the background plays an eroded audio accompaniment - a chopped’n’screwed style composition which has been eroded beyond recognition. Nostrils awaken to the scent of dirt via the artists’ fragrance creation - the scent of petrichor meets decaying clay.”
                    `,
                  }}
                />
              </div>
            ),
          });
        }}
      />
      {loadedArtworks.map((artwork, index) => (
        <Node
          key={artwork.name}
          position={[
            Math.cos(angleStep * (index + 1)) * 2.2,
            Math.sin(angleStep * (index + 1)) * 2.2,
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

export default GirlOnRoad;
