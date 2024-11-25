import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/Data_Minds/Reimagining_reality/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "./assets/Data_Minds/Reimagining_reality/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "Reimagining reality",
    images: Object.values(artwork1),
    text: "*<em>DATA MINDS: Reimagining reality</em>*In 1878, Eadweard Muybridge’s *<em>The Horse in Motion* fundamentally altered human perception. For the first time in human history, the precise movement of a horse’s legs in gallop was observed, a feat incapable with the human eye. Immediately influential in artistic and scientific circles, this precursor to cinema and television dramatically reshaped humanity’s conceptions of culture, information and reality.In the post-industrial era, new developments in networked technologies and artificial intelligence (AI) continue to reshape our perception. Data mining, a form of machine learning, is the generation of rules and information from large swathes of data. In *<em>DATA MINDS*, this process takes on a more humanistic lens, with each artist mining the personal, cultural, or historical. The works reveal patterns and contradictions in a world increasingly augmented by technology, through common themes of obsession, pop culture, and humanity’s enduring search for truth.",
  },
  {
    name: "Curators",
    images: Object.values(artwork2),
    text: "About Wednesday Sutherland:<br>Wednesday Sutherland is an independent arts worker, curator and artist living and working in Muloobinba/Newcastle, AU. Throughout her artistic and curatorial practice is a focus on the crossover between analogue processes and contemporary technologies. Her largely photomedia-based work is often iterative and autobiographical, exploring personal and historical notions of memory, grief and loss. Wednesday is an active member of WHIP Collective, a group of women-identifying professional photographers in the Hunter region. Currently working freelance, she has previously held positions at Runway Journal, Gadigal Land/Sydney, and The Lock-Up, Newcastle. Wednesday holds a Bachelor of Creative Industries (Visual Arts) with Distinction, University of Newcastle.<br><br><a href=”[https://instagram.com/wednesdaysutherland](https://www.wednesdaysutherland.com/)” target=”_blank”>https://www.wednesdaysutherland.com/</a><br><a href=”https://instagram.com/wednesdaysutherland” target=”_blank”>@wednesdaysutherland</a><br><br>About Alexandra Kirwood (HIBALL):<br>Alexandra Kirwood is a researcher and image-maker and a former Researcher in Residence at ACMI X. Her creative practice research explores relationships between bodies and images in the context of art, fashion, performance, and digital technologies. She aims to question image consumption, the role of new technology, and digital representations of bodies to uncover the social implications of image-making. She recently completed a Master in Design at RMIT titled  'Time-Images and Digital Fashion Sculpture', from which she graduated with high distinction. She has worked with architectural firms OCTA and Grimshaw Architects to create large-scale site-specific public video works, including Significant Surfaces (2022) and Floating Bodies (2021). Currently, Alexandra is a sessional lecturer and course coordinator at RMIT in the Bachelor of Fashion (Design).<br><br><a href=”[https://instagram.com/a](https://www.wednesdaysutherland.com/)lexandrakirwood” target=”_blank”>[https://www.alexandrakirwood.com/](https://www.wednesdaysutherland.com/)</a><br><a href=”https://instagram.com/[a](https://www.wednesdaysutherland.com/)lexandrakirwood” target=”_blank”>@[a](https://www.wednesdaysutherland.com/)lexandrakirwood</a>",
  },
];

function DataMinds({ onNodeClick, position, rotate }) {
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
      label="Exhibition Information"
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "DATA MINDS",
          pageUrl: "/data-minds/",
          content: [
            <p
              dangerouslySetInnerHTML={{
                __html: `
                <em>DATA MINDS</em> examines emerging processes and issues
                arising from technology, exploring how art can grapple with the
                rapidly developing field of Artificial Intelligence, and the
                pervasive influence of the Internet on modern society. With each
                artist incorporating or critiquing synthetic, AI or net-based
                media at the centre of their practice, this exhibition offers a
                timely exploration of rapidly evolving fields.
                <br />
                Each invited artists’ practices offer alternative views of these
                systems, often rooted in physical media, and assisted by or
                examining AI and net-based technologies or ideas. In 
                <em>DATA MINDS</em>, artists and audiences are encouraged to
                ponder these issues through critical and creative engagement.
                Each artist may be seen as grouped together through a form of
                ‘pattern recognition’, each linked by a common thread. These
                threads may be as literal as shared media – moving image,
                installation – and as esoteric as popular culture, conspiracy
                theories, and ghosts.
                <br />
                This summer, in The Lock-Up’s historical, maze-like spaces,
                these speculative futures become rooted in a material setting.
                Physical works become embedded with fictions, uniting the
                subconscious and the digital; the imagined and the real. The
                only thing certain in <em>DATA MINDS</em> is, whatever AI and
                the Internet really ‘are’, they exist in an undeniably human
                world: fallible, illogical, and driven by subconscious desires.
                <br />
                <br />
                <strong>
                  With artists Roy Ananda, Girl On Road, HIBALL, Jon Rafman and
                  Brie Trenerry.
                </strong>
                <br />
                <strong>
                  <em>DATA MINDS</em> is curated by Wednesday Sutherland,
                  assisted by Alexandra Kirwood
                </strong>
                <br />
                <br />
                <em>
                  This project has been assisted by the Australian Government
                  through Creative Australia, its principal arts investment and
                  advisory body; the Victorian Government through Creative
                  Victoria; and The Lock-Up’s Artist in Residence program.
                </em>
               `,
              }}
            />,
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
              artistName: "DATA MINDS",
              pageUrl: `/data-minds/${artwork.name}/`,
              content: [
                ...artwork.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${artwork.name} ${imgIndex + 1}`}
                  />
                )),
                <p
                  dangerouslySetInnerHTML={{
                    __html: `
                      Roy Ananda's contribution to <i>DATA MINDS</i> connects over four hundred fictional automatons, robots, and artificial intelligences from a wide range of pop-cultural and mythological sources, positing them as agents in a vast conspiracy against the human race. <i>Evidence wall</i> owes a great debt to the meta-fictional tradition perhaps best exemplified by Alan Moore and Kevin O'Neill's <i>The League of Extraordinary Gentlemen</i> (1999-2019), in which a dizzying array of characters from a wide spectrum of literary sources exist in a shared fictional universe.
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
                />,
              ],
            });
          }}
        />
      ))}
    </Node>
  );
}

export default DataMinds;
