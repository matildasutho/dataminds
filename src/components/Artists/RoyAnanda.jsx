import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/Roy_Ananda/Evidence_Wall/*.{png,jpg,jpeg,svg}"
);

export const artworks = [
  {
    name: "Evidence wall",
    artistName: "Roy Ananda",
    images: Object.values(artwork1),
    text: "<i>Evidence wall</i><br>2023<br>Digital prints and ink on paper, thread, pins, acoustic pinboard, dimensions variable.<br/><br/>This work was originally commissioned by <i>Artlink's</i>, After AI. Issue 43:2 | Wirltuti / Spring 2023.",
    statement:
      " Roy Ananda's contribution to <i>DATA MINDS</i> connects over four hundred fictional automatons, robots, and artificial intelligences from a wide range of pop-cultural and mythological sources, positing them as agents in a vast conspiracy against the human race. <i>Evidence wall</i> owes a great debt to the meta-fictional tradition perhaps best exemplified by Alan Moore and Kevin O'Neill's <i>The League of Extraordinary Gentlemen</i> (1999-2019), in which a dizzying array of characters from a wide spectrum of literary sources exist in a shared fictional universe.<br /><br />While <i>Evidence wall's</i> default interface offers users a wandering lens across an analogue conspiracy wall, a more interactive mode can be activated by clicking and dragging any given portion of the image. This allows for a more curious observer to follow specific chains of association between the AI's and become more deeply acquainted with sets of artist-determined overlapping taxonomies.<br /><br />In some instances, AI's have been grouped according to their capacity to exhibit typically human traits, such as artistry, sadism, megalomania or romantic infatuation. Elsewhere, they are grouped according to Myer-Briggs Type Indicator personality traits or in their adherence to supposed safeguards, such as Isaac Asimov's 'Three Laws of Robotics'.<br /><br />The belligerently analogue approach to mapping these connections-pins, thread, index cards and images reminiscent of Polaroid photography-is intended as something of a foil to the tech-minded subject matter. It perhaps suggests yet another fictional character, the conspiracy theorist himself-a tinfoil-hat-wearing Luddite making a last futile stand against the coming of the machines.<br /><br />This work was originally commissioned by <i>Artlink's</i> , <i>After AI</i>. Issue 43:2 | Wirltuti / Spring 2023<br /><br /><a href=\"https://www.artlink.com.au/articles/3432/evidence-wall/\" target=\"_blank\">Click here</a> to view this work's original iteration, developed with photographer Sam Roberts and web developer Tom Crisp.",
  },
];

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

function RoyAnanda({ onNodeClick, position, rotate }) {
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

  const totalNodes = loadedArtworks.length + 5; // Total number of artworks + 1 statement
  const angleStep = (2 * Math.PI) / totalNodes;

  return (
    <Node
      position={position}
      label="Roy Ananda"
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "Roy Ananda",
          pageUrl: "/roy-ananda/",
          content: [
            <p>
              {" "}
              Roy Ananda is a visual artist, writer, and educator practicing on
              Kaurna Country (Tarndanya/Adelaide Plains). His objects, drawings,
              installations, texts, and videos variously celebrate popular
              culture, play, process, and the very act of making. Since 2001 he
              has exhibited prolifically around Australia and since 2004 has
              lectured in drawing and sculpture at Adelaide Central School of
              Art. Ananda's solo projects have included A is for Anvil (2006) at
              West Space (Melbourne), The Devourer (2013) at the Contemporary
              Art Centre of South Australia, and Slow crawl into infinity (2014)
              at the Samstag Museum of Art (Adelaide). His work has been
              included in such significant survey exhibitions as Primavera
              (2004) at the Museum of Contemporary Art (Sydney), the Australian
              Drawing Biennial (2004) at the Drill Hall Gallery (Canberra), and
              the 2018 Adelaide Biennial of Australian Art: Divided Worlds at
              the Art Gallery of South Australia (Adelaide). In 2017, Ananda
              completed a post-graduate research degree at the University of
              South Australia with a specific focus on the intersection of
              pop-culture fandom and contemporary art practice. He is the
              subject of the 2021 South Australian Living Artist Publication,
              published by Wakefield Press.
              <br />
              <br />
              <a href="https://www.royananda.com/" target="_blank">
                https://www.royananda.com/
              </a>
              <br />
              <a href="https://www.instagram.com/roy.ananda/" target="_blank">
                @roy.ananda
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
              artistName: "Roy Ananda",
              pageUrl: `/roy-ananda/${generateSlug(artwork.name)}/`,
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

export default RoyAnanda;
