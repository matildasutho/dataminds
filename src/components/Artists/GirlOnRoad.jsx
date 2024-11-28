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
      "<em>dirtstyle: cipher</em> (2024), is a speculative exploration of survival in an alternate reality, where the only way to communicate unobserved is through image encryption. An algorithm is our most valuable asset, and falling into the wrong hands would compromise the safety of us all. Originally an aesthetic movement of the 1990s web 2.0 era, dirtstyle held onto antialiased media, system styling, and was vehemently anti-upgrade. In this body of work, the term dirtstyle is repurposed and brought to life as <em>dirtstyle tactics</em>, taking on new mediums and foregrounding the dirt in dirtstyle.<br/>On the far wall of Cell B, a suspended monitor loops the <em>dirtstyle: cipher</em> (2024), code endlessly. Below it, in the second half of the cell, a large mound of dirt dominates the space. To the left of the monitor, sits an Apple Mac Mini—serving as a stark contrast to the open-ended processes of the code and dirt around it.<br /><em>dirtstyle: cipher</em>, is an installation built around a Python program running in a continuous loop. It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create layered visual ciphers using. The process begins with a vessel and cipher: images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br />Bit planes are used in image encryption software, where algorithms rearrange layers to ensure they are not compromised when they reach their destination. In this system, images are not just decomposed and encrypted, but reassembled with new layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br />This blending of nature and technology raises questions about the limits of encrypted communication. How long can we rely on these tactics before surveillance systems catch up? When programmers decipher bit planes and entropy is harnessed, might humanity itself become the final cipher—the last frontier of encryption?<br /><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
  },
  {
    name: "bit plane 5",
    images: Object.values(artwork2),
    text: "<em>dirtstyle: bit plane 5</em><br>2024.<br>Dirt, digital print on 80gsm paper",
    statement:
      "<em>dirtstyle: cipher</em> (2024), is a speculative exploration of survival in an alternate reality, where the only way to communicate unobserved is through image encryption. An algorithm is our most valuable asset, and falling into the wrong hands would compromise the safety of us all. Originally an aesthetic movement of the 1990s web 2.0 era, dirtstyle held onto antialiased media, system styling, and was vehemently anti-upgrade. In this body of work, the term dirtstyle is repurposed and brought to life as <em>dirtstyle tactics</em>, taking on new mediums and foregrounding the dirt in dirtstyle.<br/>On the far wall of Cell B, a suspended monitor loops the <em>dirtstyle: cipher</em> (2024), code endlessly. Below it, in the second half of the cell, a large mound of dirt dominates the space. To the left of the monitor, sits an Apple Mac Mini—serving as a stark contrast to the open-ended processes of the code and dirt around it.<br /><em>dirtstyle: cipher</em>, is an installation built around a Python program running in a continuous loop. It draws from a curated archive of media—films, internet finds, personal image libraries, and texts—to create layered visual ciphers using. The process begins with a vessel and cipher: images are reduced to grayscale and decomposed into eight bit planes, each representing different layers of detail. The Least Significant Bit contains noise, while the Most Significant Bit holds key visual data, such as shadows and defining lines.<br />Bit planes are used in image encryption software, where algorithms rearrange layers to ensure they are not compromised when they reach their destination. In this system, images are not just decomposed and encrypted, but reassembled with new layers embedded inside. As the program loops, these ciphers evolve, creating messages within messages—an endless abstraction of communication.<br />This blending of nature and technology raises questions about the limits of encrypted communication. How long can we rely on these tactics before surveillance systems catch up? When programmers decipher bit planes and entropy is harnessed, might humanity itself become the final cipher—the last frontier of encryption?<br /><em>This project has been made possible with support from the Australian Government through Creative Australia and The Lock-Up’s Artist in Residence program.</em>",
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
