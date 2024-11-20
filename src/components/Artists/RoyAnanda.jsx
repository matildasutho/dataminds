import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "../../assets/HIBALL/Composition_for_Mnemosyne/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "Composition for Mnemosyne",
    images: Object.values(artwork1),
    text: "HIBALL, <em>Composition for Mnemosyne</em>, 2024. Two-channel 2k video, stereo sound. 7:24 min <br/><br/>HIBALL, the best gift to give is a little one, if they lose it, just order another, 2024. UV prints on steel with freehand engraving, custom wood frame, 47 x 59 cm, edition of 3 + 1 AP<br/><br/>HIBALL, eye, 2024. UV print on steel with sparkler bomb burn marks, custom wood frame, 42 x 110cm, edition of 3 + 1 AP<br/><br/>HIBALL, scrambled (working), 2024. Lenticular 3D image fine art print, lightbox, custom steel frame, 59.4 x 84.1 cm, edition of 2 + 1 AP<br/><br/>HIBALL, scrambled (working), 2024. Lenticular 3D image fine art print, lightbox, custom steel frame, 59.4 x 84.1 cm, edition of 2 + 1 AP",
  },
];

function JonRafman({ onNodeClick, position, rotate }) {
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
      label="HIBALL"
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "HIBALL",
          content: (
            <div>
              <img src="../../assets/Jon_Rafman/image1.jpg" alt="HIBALL" />
              <p
                dangerouslySetInnerHTML={{
                  __html: `
                       HIBALL lives and works in Montreal and Los Angeles. He is acclaimed for a multifaceted oeuvre encompassing video, animation, photography, sculpture and installation. His quasi-anthropological works—often incorporating internet-sourced images and narrative material—investigate digital technologies and the communities they create, focusing on the losses, longings and fantasies that shape our technology-infused lives today. Rafman’s recent solo exhibitions were held at 180 The Strand, London (2023); Schinkel Pavillon, Berlin (2022), Ordet, Milan (2022), Centraal Museum, Utrecht (2020), Fondazione Modena Arti Visive (2018), Sprüth Magers, Berlin (2017) and Musée d’art Contemporain de Montréal (2015). His works have been featured in prominent international group exhibitions, most recently Kunstmuseum Bonn (2021), 58th Venice Biennale (2019), Sharjah Biennial (2019, 2017), Institute of Contemporary Art, Boston (2018). He is represented in Australia by Neon Parc and internationally by Sprüth Magers.
                         <br />
                <br />
                <a href="https://jonrafman.com/" target="_blank">
                  https://jonrafman.com/
                </a>
                <br />
                <br />
                 <a href="https://spruethmagers.com/artists/jon-rafman/" target="_blank">
                  https://spruethmagers.com/artists/jon-rafman/
                </a>
                <br />
                <br />
                <a href="https://www.instagram.com/jonrafman/" target="_blank">
                  @jonrafman
                </a>
                    `,
                }}
              />
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
        label="Text"
        scale={[1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick({
            type: "statement",
            artistName: "HIBALL",
            content: (
              <div>
                <img src="../../assets/Jon_Rafman/image1.jpg" alt="HIBALL" />
                <p
                  dangerouslySetInnerHTML={{
                    __html: `
                       HIBALL's quasi-anthropological works—often incorporating
                  internet-sourced images and narrative material—investigate
                  digital technologies and the communities they create, focusing
                  on the losses, longings and fantasies that shape our
                  technology-infused lives today. Rafman's contribution to <i>DATA
                  MINDS</i> includes the major video work <i>Punctured Sky</i> (2021),
                  alongside two large-scale paintings that explore the artistic
                  possibilities of the latest in machine learning and text to
                  image algorithms.
                  <br />
                  <br />
                  First presented at the artist's Australasian debut
                  <a
                    href="https://neonparc.com.au/exhibitions/jon-rafman"
                    target="_blank"
                  >
                    ɐɹqɐpɥǝʞ ɐɹʌɐ* at Neon Parc (Vic) in 2023
                  </a>
                  , Rafman's paintings entangle various image-making techniques
                  both physically and virtually. The exhibition's title — an
                  upside-down rendering of “avra kehdabra” — is popularised as
                  “Abracadabra,” and originates in an ancient Hebrew phrase
                  meaning “I create like the word.” Recalling a vast literary
                  and historical tradition, from Yahweh's Creation of the Torah;
                  to St John's Biblical creation myth “In the beginning was the
                  Word;” and up through modern literature, such as Whitman's
                  “With the twirl of my tongue / I encompass worlds and volumes
                  of world”: the significance of “creating like the word” is
                  augmented with the text to image algorithm with which the
                  works themselves were created.
                  <br />
                  <br />
                  In *Panic on the Beach* and *Riot in the Mall Parking Lot*
                  (both 2023), **one gains a sense of what role “the word”
                  played in the creation of these unsettling images. Utilising
                  the nuanced vocabulary of text to image AI-generated
                  compositions, the works are as enigmatic in their physical
                  presence as the imagery they represent. In The Lock-Up's
                  comparatively solemn Front Galleries, the paintings'
                  monumental scale and ambiguous materiality suggest they might
                  be forgotten wonders from a European master; albeit one whose
                  existence lies as much in the past as it does the future.
                  <br />
                  <br />
                  Moving through the space, the audience finds Rafman's major
                  video work *Punctured Sky* (2021), in which a piece of a
                  gamer's past vanishes without a trace, triggering a quest for
                  answers. Along the way, the narrator encounters uncanny
                  obstacles and part-human avatars – meticulously crafted from
                  found pixels and cyber history – which call his own
                  recollections of youth into question. Early internet
                  aesthetics collide with the dark edges of online folklore,
                  creating an unsettling yet deeply funny commentary on how
                  technology permeates and mediates our humanity, memory, and
                  concept of self. The film's pervasive references to crime
                  fiction and multiple maze-like settings gain pertinence in the
                  presence of The Lock-Up's historic cells. As Rafman discusses,
                  “these technologies allow me to construct rich new virtual
                  worlds. I combine the language of video games and pop culture
                  with classical references to create my own ‘Boschian'
                  21st-century hellscape and purgatory.”
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
              artistName: "HIBALL",
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
