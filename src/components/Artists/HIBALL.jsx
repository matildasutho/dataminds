import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/HIBALL/Composition_for_Mnemosyne/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "Composition for Mnemosyne",
    images: Object.values(artwork1),
    text: "HIBALL, <em>Composition for Mnemosyne</em>, 2024.<br>Two-channel 2k video, stereo sound. 7:24 min",
  },
];

function HIBALL({ onNodeClick, position, rotate }) {
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
                src="./assets/HIBALL/Evidence_Wall/HIBALL_Evidence-Wall_crop-1.jpg"
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


<br/>
<a href="https://www.instagram.com/_hiball_/" target="_blank">@_hiball_</a>




<h2>Stanton Cornish-Ward</h2>



Stanton Cornish-Ward is an artist and filmmaker based in Naarm Melbourne, from Boorlo Perth. Her work explores the nuances of memory, intergenerational trauma, and the human impact of advancing technologies. Recent exhibitions include the National Gallery of Victoria, Naarm Melbourne (2023); Palazzo San Giuseppe, Polignano a Mare Italy (2022); Discorda Gallery, Naarm Melbourne (2021); Metro Arts, Meanjin Brisbane (2020), and MARS Gallery, Naarm Melbourne (2019). Cornish-Ward’s collaborative films *LOCK* (2021) and *In a World Full of Angels* (2022) were awarded Best Experimental Film at the Cologne International Film Festival 2022 and Experimental Forum International Film and Video Art Festival L.A 2023. Cornish-Ward teaches ‘Art & Film’ at Monash University.

<br/><br/>
 <a href="https://www.stantoncornishward.com/" target="_blank">https://www.stantoncornishward.com/</a>


<br/>
<a href="https://www.instagram.com/stntn/" target="_blank">@stntn</a>



<h2>Alexandra Kirwood</h2>



Alexandra Kirwood is a researcher and image-maker and a former Researcher in Residence at ACMI X. Her creative practice research explores relationships between bodies and images in the context of art, fashion, performance, and digital technologies. She aims to question image consumption, the role of new technology, and digital representations of bodies to uncover the social implications of image-making. She recently completed a Master in Design at RMIT titled  'Time-Images and Digital Fashion Sculpture', from which she graduated with high distinction. She has worked with architectural firms OCTA and Grimshaw Architects to create large-scale site-specific public video works, including *Significant Surfaces* (2022) and *Floating Bodies* (2021). Currently, Alexandra is a sessional lecturer and course coordinator at RMIT in the Bachelor of Fashion (Design).



<br/><br/>
 <a href="https://www.alexandrakirwood.com/" target="_blank">https://www.alexandrakirwood.com/</a>


<br/>
<a href="https://www.instagram.com/alexandrakirwood/" target="_blank">@alexandrakirwood</a>

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
                      <em>Composition for Mnemosyne</em> consists of a two-channel video artwork accompanied by five wall works, made in response to the artists’ time in Newcastle as part of The Lock-Up’s Artist in Residence program. Reflecting the artists’ own observations on shifting synthetic media as well as the ambient technological infrastructure of Newcastle, the works examine the complex and often uneasy relationship between human experience and increasingly pervasive AI driven systems, often rendered invisible. Avoiding a didactic approach, the series of works invites viewers to consider their own entanglement with rapidly advancing technology.

<br /><br />

The first video channel features The Hunter Singers, a Newcastle youth choir directed by Kim Sutherland OAM and conducted by Charissa Ferguson, performing an AI-assisted score by long-time collaborator of the artists, Mitchell Mackintosh. Using their voice and hands they emulate synthetic sounds into a choral performance, exploring the way new technology is not only reshaping the visual landscape but becoming an embodied and mediated presence in the human body.

<br /><br />

The second channel juxtaposes the choir's performance with scenes of a group of teenagers navigating Newcastle’s shifting technological landscape. These spaces— decaying WWII gun encampments, abandoned barracks, and the stark presence of a fighter jet museum adjacent to Australia’s primary F-35 training base— reflect cycles of progress intertwined with military influence. The F-35s, equipped with advanced AI-driven systems—a key advantage since the 2010s—train every weekday, looping over Newcastle’s sky. With each step forward, the perception of the environment is reprogrammed, shaped by both the visible physical infrastructure and the invisible networks that redefine these spaces for each generation.

<br /><br />

The wall works extend these themes by merging real and synthetic imagery. Three works incorporate UV printed imagery on steel, their surfaces either burnt by homemade explosives, or scratched to leave behind tags, both motifs in the film. Two additional lenticular works, composed entirely of synthetic imagery, depict a hypothetical, disembodied perspective that merges human vision with machine-driven overlays, offering an augmented view from both the ground and the sky.

<br /><br />

<em>This project has been assisted by the Australian Government through Creative Australia, its principal arts investment and advisory body; the Victorian Government through Creative Victoria; and The Lock-Up’s Artist in Residence program.</em>

<br /><br />
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

export default HIBALL;
