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
    text: "<em>dirtstyle: cipher</em><br>2024<br>Dirt, Apple Mac Mini, petrichor, sound",
    statement:
      "Dirtstyle tactics form the conceptual foundation of this work, a speculative exploration of survival in an alternate reality. Originally an aesthetic movement of the 1990s web 2.0 era, <em>dirtstyle</em> embraced lo-fidelity visuals and system graphics, celebrating imperfections and digital entropy. This project brings the ethos of dirtstyle into the present day, extending its spirit beyond the web browser through new technologies and encrypted systems. In this evolution, dirtstyle becomes a method of evasion, where ordinary people use hidden image-based encryption to resist omnipresent surveillance. These tactics invert the relationship between nature and technology, harnessing entropy and decomposition to produce unpredictable outcomes.<br /><br />At the core of this project is a Python program running in a continuous loop. It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create layered visual ciphers. The process begins with a vessel and cipher: images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br /><br />Bit planes, a common method of image encryption, allow one image to be hidden within another. Pixels can be rearranged, ensuring that only those with the correct decryption tools can reconstruct the original. In this system, images are not just decomposed but reassembled with hidden layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br /><br />On the far wall of Cell B, a suspended monitor loops the <em>dirtstyle</em> code endlessly. Below it, in the second half of the cell, a large mound of dirt dominates the space. To the left of the monitor, a Mac Mini sits exposed, its presence serving as a critique of the black-box nature of Apple products and their planned obsolescence—a stark contrast to the open-ended processes of the code and dirt around it.<br /><br />This blending of nature and technology raises questions about the limits of encrypted communication. How long can we rely on these tactics before surveillance systems catch up? When programmers decipher bit planes and entropy is harnessed, might humanity itself become the final cipher—the last frontier of encryption?<br /><br /><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
  },
  {
    name: "bit plane 5",
    images: Object.values(artwork2),
    text: "<em>dirtstyle: bit plane 5</em><br>2024.<br>Dirt, digital print on 80gsm paper",
    statement:
      "Dirtstyle tactics form the conceptual foundation of this work, a speculative exploration of survival in an alternate reality. Originally an aesthetic movement of the 1990s web 2.0 era, <em>dirtstyle</em> embraced lo-fidelity visuals and system graphics, celebrating imperfections and digital entropy. This project brings the ethos of dirtstyle into the present day, extending its spirit beyond the web browser through new technologies and encrypted systems. In this evolution, dirtstyle becomes a method of evasion, where ordinary people use hidden image-based encryption to resist omnipresent surveillance. These tactics invert the relationship between nature and technology, harnessing entropy and decomposition to produce unpredictable outcomes.<br /><br />At the core of this project is a Python program running in a continuous loop. It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create layered visual ciphers. The process begins with a vessel and cipher: images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br /><br />Bit planes, a common method of image encryption, allow one image to be hidden within another. Pixels can be rearranged, ensuring that only those with the correct decryption tools can reconstruct the original. In this system, images are not just decomposed but reassembled with hidden layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br /><br />On the far wall of Cell B, a suspended monitor loops the <em>dirtstyle</em> code endlessly. Below it, in the second half of the cell, a large mound of dirt dominates the space. To the left of the monitor, a Mac Mini sits exposed, its presence serving as a critique of the black-box nature of Apple products and their planned obsolescence—a stark contrast to the open-ended processes of the code and dirt around it.<br /><br />This blending of nature and technology raises questions about the limits of encrypted communication. How long can we rely on these tactics before surveillance systems catch up? When programmers decipher bit planes and entropy is harnessed, might humanity itself become the final cipher—the last frontier of encryption?<br /><br /><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
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
              pageUrl: `/girl-on-road/${artwork.name}/`,
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
