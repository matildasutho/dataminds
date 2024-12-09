import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/Girl_On_Road/cipher/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "./assets/Girl_On_Road/bit_plane_5/*.{png,jpg,jpeg,svg}"
);

export const artworks = [
  {
    name: "cipher",
    images: Object.values(artwork1),
    text: "<em>dirtstyle: cipher</em><br>2024<br>Dirt, Apple Mac Mini, petrichor, sound",
    statement:
      "<em>dirtstyle: cipher</em> (2024), is a speculation of survival in an alternate reality, where the only way to communicate unobserved is through image encryption, making the algorithm our most valuable asset. Originally an aesthetic movement of the 1990s web 2.0 era, dirtstyle embraced antialiased media, system styling, and was vehemently anti-upgrade. In this body of work, the movement is repurposed and brought to life as <em>dirtstyle tactics</em>, taking on an expanded range of technology, and foregrounding the dirt.<br/><em>dirtstyle: cipher</em>, is built around a method of encryption written by Girl On Road. Coded using the python programming language, this script decomposes images into bit planes (vessels) and recomposes them with another image embedded inside (cipher). It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create these layered visual ciphers. The images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br />Bit planes are used in image encryption software, where algorithms rearrange layers to ensure they are not compromised when they reach their destination. In this system, images are not just decomposed and encrypted, but reassembled with new layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br /><br/><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
  },
  {
    name: "bit plane 5",
    images: Object.values(artwork2),
    text: "<em>dirtstyle: bit plane 5</em><br>2024.<br>Dirt, digital print on 80gsm paper",
    statement:
      "<em>dirtstyle: cipher</em> (2024), is a speculation of survival in an alternate reality, where the only way to communicate unobserved is through image encryption, making the algorithm our most valuable asset. Originally an aesthetic movement of the 1990s web 2.0 era, dirtstyle embraced antialiased media, system styling, and was vehemently anti-upgrade. In this body of work, the movement is repurposed and brought to life as <em>dirtstyle tactics</em>, taking on an expanded range of technology, and foregrounding the dirt.<br/><em>dirtstyle: cipher</em>, is built around a method of encryption written by Girl On Road. Coded using the python programming language, this script decomposes images into bit planes (vessels) and recomposes them with another image embedded inside (cipher). It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create these layered visual ciphers. The images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br />Bit planes are used in image encryption software, where algorithms rearrange layers to ensure they are not compromised when they reach their destination. In this system, images are not just decomposed and encrypted, but reassembled with new layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br /><br/><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
  },
];

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

function GirlOnRoad({ onNodeClick, position, rotate }) {
  const [loadedArtworks, setLoadedArtworks] = useState([]);
  const modelRef = useRef();

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

  useFrame((state, delta) => {
    if (modelRef.current && rotate) {
      modelRef.current.rotation.y += delta;
    }
  });

  const totalNodes = loadedArtworks.length + 4; // Total number of artworks + 1 statement
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
          pageUrl: "/girl-on-road/",
          content: [
            <p>
              Girl On Road (GOR) is the creative studio and record label of
              Melbourne-based artist, Matilda Sutherland. Through code, design,
              installation, and sound, GOR explores the extent to which we are
              embedded in a hyper-digitised age. As a label, GOR houses
              underground and experimental music releases, and hosts live
              events. Each GOR project is an exercise in world
              building—traversing mediums, screens and stages—all in a bid to
              re-wild the technosphere. GOR's most recent body of work,{" "}
              <em>The Cowgirl Manifesto</em>, has been presented in different
              forms at Hybrid Live Coding Interfaces, (Montreal, 2021), Runway
              Journal (Digital Publication, 2022), The International Conference
              for Live Coding (Utrecht, 2023).
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
            </p>,
          ],
        });
      }}
    >
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
              artistName: "Girl On Road",
              pageUrl: `/girl-on-road/${generateSlug(artwork.name)}/`,
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
                <p
                  key="statement"
                  dangerouslySetInnerHTML={{ __html: artwork.statement }}
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
