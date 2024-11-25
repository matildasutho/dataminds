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
    text: "<em>dirtstyle: cipher</em><br>2024<br>Dirt, Apple Cinema Display, Apple Mac Mini, Apple Magic Mouse, sound, petrichor",
    statement:
      "This work is based around a piece of code I wrote using the Python programming language - with some assistance from artificial 'intelligence'. It runs on a loop, drawing from a bank of media I have collected across films, the internet, my own image libraries, and texts. These images depict an alternate reality in which <em>dirtstyle</em> tactics are the only way to survive. In this alternate reality, the common person must encrypt messages within images to circumnavigate surveillance.<br>On a 2005 Apple Cinema HD Display, the <em>dirtstyle</em> cipher code loops. Beginning with a vessel and cipher, it reduces each image to grayscale. The grayscale images are then decomposed into 8 bit planes - where white equals 0, and black equals 1. These planes represent layers of detail in an image, beginning at the Least Significant Bit, which is essentially noise, and ending with the Most Significant Bit. The MSB contains visual data which impacts the composition of the image the most (dark shadows and hard lines).<br>Bit planes are commonly used to encrypt images. Within these planes you can hide an image within another. You can also rearrange the pixels to ensure that only someone with the correct decryption software can put it back together. <br>So on this display you can see the images being decomposed - separated into their layers and reconstituted with a new layer inside. These messages become abstracted as the ciphers are fed back into the code, hiding messages within messages. <br>Decomposed audio accompanies the display. It has been compressed beyond recognition, slowed and warped until it's only a hum. The sound of the dirt at work. To the left of the screen is a mass of dirt spilling out of the wall. A diffuser has been placed to combat its' earthy scent. However, the diffuser only seems to add to the smell - creating a pungent odour which might disorient you into questioning whether the dirt is in fact at work on the cipher.<br>dirtstyle tactics reverse the role of nature and technology, feeding it back into itself to create unpredictable outcomes. Suddenly a key has two sides, and unlocking one door also unlocks another. <em>dirtstyle</em> tactics harness entropy and compost to decompose digital matter. In this alternate reality, one must question how long we can continue to communicate like this? With programmers employed to decipher bit planes and ubiquitous surveillance - might humans be the final frontier of encryption? <br><br><em>This project has been assisted by the Australian Government through Creative Australia, its principal arts investment and advisory body; and The Lock-Up's Artist in Residence program.</em>",
  },
  {
    name: "bit plane 5",
    images: Object.values(artwork2),
    text: "<em>dirtstyle: bit plane 5</em><br>2024.<br>Dirt, digital print on 80gsm paper",
    statement:
      "This work is based around a piece of code I wrote using the Python programming language - with some assistance from artificial 'intelligence'. It runs on a loop, drawing from a bank of media I have collected across films, the internet, my own image libraries, and texts. These images depict an alternate reality in which <em>dirtstyle</em> tactics are the only way to survive. In this alternate reality, the common person must encrypt messages within images to circumnavigate surveillance.<br>On a 2005 Apple Cinema HD Display, the <em>dirtstyle</em> cipher code loops. Beginning with a vessel and cipher, it reduces each image to grayscale. The grayscale images are then decomposed into 8 bit planes - where white equals 0, and black equals 1. These planes represent layers of detail in an image, beginning at the Least Significant Bit, which is essentially noise, and ending with the Most Significant Bit. The MSB contains visual data which impacts the composition of the image the most (dark shadows and hard lines).<br>Bit planes are commonly used to encrypt images. Within these planes you can hide an image within another. You can also rearrange the pixels to ensure that only someone with the correct decryption software can put it back together. <br>So on this display you can see the images being decomposed - separated into their layers and reconstituted with a new layer inside. These messages become abstracted as the ciphers are fed back into the code, hiding messages within messages. <br>Decomposed audio accompanies the display. It has been compressed beyond recognition, slowed and warped until it's only a hum. The sound of the dirt at work. To the left of the screen is a mass of dirt spilling out of the wall. A diffuser has been placed to combat its' earthy scent. However, the diffuser only seems to add to the smell - creating a pungent odour which might disorient you into questioning whether the dirt is in fact at work on the cipher.<br>dirtstyle tactics reverse the role of nature and technology, feeding it back into itself to create unpredictable outcomes. Suddenly a key has two sides, and unlocking one door also unlocks another.<em>dirtstyle</em>tactics harness entropy and compost to decompose digital matter. In this alternate reality, one must question how long we can continue to communicate like this? With programmers employed to decipher bit planes and ubiquitous surveillance - might humans be the final frontier of encryption? <br><br><em>This project has been assisted by the Australian Government through Creative Australia, its principal arts investment and advisory body; and The Lock-Up's Artist in Residence program.</em>",
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
