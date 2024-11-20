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
    text: "Text for Artwork 1",
  },
];

function RoyAnanda({ onNodeClick, position, rotate }) {
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
              <img
                src="../../assets/Roy_Ananda/Evidence_Wall/HIBALL_Evidence-Wall_crop-1.jpg"
                alt="HIBALL"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: `
                   Based in Melbourne, HIBALL are a director duo specialising in moving image for the digital world. Their work dances between art, fashion and technology - exploring speculative realities and memory. Operating between digital and analogue, their approach remains rooted in emotion and human experience.

<br/><br/>

Helmed by Alexandra Kirwood and Stanton Cornish-Ward, HIBALL has built a reputation creating intelligent, conceptual, stylized films. Their work has been accepted into esteemed BAFTA Award-qualifying festivals such as Cork Film Festival and Aesthetica Film Festival, as well as other notable festivals such as Dublin International Film Festival, Leiden International Short Film Festival, and Sydney World Film Festival. They have been part of official selections of film festivals in Aotearoa (New Zealand), Australia, Bulgaria, Canada, Denmark, France, Italy, Ireland, Germany, Hong Kong, Korea, The Netherlands, Romania, Spain, Mexico, UK and USA.

<br/><br/>
 <a href="https://hiball.tv/" target="_blank">https://hiball.tv/</a>


<br/><br/>
<a href="https://www.instagram.com/_hiball_/" target="_blank">@_hiball_</a>


<br/><br/>

<br/><br/>

<h2>Stanton Cornish-Ward</h2>

<br/><br/>

Stanton Cornish-Ward is an artist and filmmaker based in Naarm Melbourne, from Boorlo Perth. Her work explores the nuances of memory, intergenerational trauma, and the human impact of advancing technologies. Recent exhibitions include the National Gallery of Victoria, Naarm Melbourne (2023); Palazzo San Giuseppe, Polignano a Mare Italy (2022); Discorda Gallery, Naarm Melbourne (2021); Metro Arts, Meanjin Brisbane (2020), and MARS Gallery, Naarm Melbourne (2019). Cornish-Ward’s collaborative films *LOCK* (2021) and *In a World Full of Angels* (2022) were awarded Best Experimental Film at the Cologne International Film Festival 2022 and Experimental Forum International Film and Video Art Festival L.A 2023. Cornish-Ward teaches ‘Art & Film’ at Monash University.

<br/><br/>
 <a href="https://www.stantoncornishward.com/" target="_blank">https://www.stantoncornishward.com/</a>


<br/><br/>
<a href="https://www.instagram.com/stntn/" target="_blank">@stntn</a>


<br/><br/>

<br/><br/>

<h2>Alexandra Kirwood</h2>

<br/><br/>

Alexandra Kirwood is a researcher and image-maker and a former Researcher in Residence at ACMI X. Her creative practice research explores relationships between bodies and images in the context of art, fashion, performance, and digital technologies. She aims to question image consumption, the role of new technology, and digital representations of bodies to uncover the social implications of image-making. She recently completed a Master in Design at RMIT titled  'Time-Images and Digital Fashion Sculpture', from which she graduated with high distinction. She has worked with architectural firms OCTA and Grimshaw Architects to create large-scale site-specific public video works, including *Significant Surfaces* (2022) and *Floating Bodies* (2021). Currently, Alexandra is a sessional lecturer and course coordinator at RMIT in the Bachelor of Fashion (Design).

<br/><br/>

<br/><br/>
 <a href="https://www.alexandrakirwood.com/" target="_blank">https://www.alexandrakirwood.com/</a>


<br/><br/>
<a href="https://www.instagram.com/alexandrakirwood/" target="_blank">@alexandrakirwood</a>

<br/><br/>
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
                <img src="../../assets/HIBALL/image1.jpg" alt="HIBALL" />
                <p
                  dangerouslySetInnerHTML={{
                    __html: `
                      HIBALL's contribution to <i>DATA MINDS</i> connects over four hundred fictional automatons, robots, and artificial intelligences from a wide range of pop-cultural and mythological sources, positing them as agents in a vast conspiracy against the human race. <i>Evidence wall</i> owes a great debt to the meta-fictional tradition perhaps best exemplified by Alan Moore and Kevin O'Neill's <i>The League of Extraordinary Gentlemen</i> (1999-2019), in which a dizzying array of characters from a wide spectrum of literary sources exist in a shared fictional universe.
                      <br />
                      <br />
                      While <i>Evidence wall's</i> default interface offers users a wandering lens across an analogue conspiracy wall, a more interactive mode can be activated by clicking and dragging any given portion of the image. This allows for a more curious observer to follow specific chains of association between the AI's and become more deeply acquainted with sets of artist-determined overlapping taxonomies.
                      <br />
                      <br />
                      In some instances, AI's have been grouped according to their capacity to exhibit typically human traits, such as artistry, sadism, megalomania or romantic infatuation. Elsewhere, they are grouped according to Myer-Briggs Type Indicator personality traits or in their adherence to supposed safeguards, such as Isaac Asimov's 'Three Laws of Robotics'.
                      <br />
                      <br />
                      The belligerently analogue approach to mapping these connections-pins, thread, index cards and images reminiscent of Polaroid photography-is intended as something of a foil to the tech-minded subject matter. It perhaps suggests yet another fictional character, the conspiracy theorist himself-a tinfoil-hat-wearing Luddite making a last futile stand against the coming of the machines.
                      <br />
                      <br />
                      This work was originally commissioned by <i>Artlink's</i> , <i>After AI</i>. Issue 43:2 | Wirltuti / Spring 2023
                      <br />
                      <br />
                      <a href="https://www.artlink.com.au/articles/3432/evidence-wall/" target="_blank">Click here</a> to view this work's original iteration, developed with photographer Sam Roberts and web developer Tom Crisp.
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

export default RoyAnanda;
