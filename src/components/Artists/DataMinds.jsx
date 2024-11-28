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
    name: "ESSAY:\nReimagining reality",
    images: Object.values(artwork1),
    text: "<h3>Reimagining reality</h3>Words: Wednesday Sutherland<br><br><br>In 1878, Eadweard Muybridge’s <em>The Horse in Motion</em> fundamentally altered human perception. For the first time in human history, the precise movement of a horse’s legs in gallop was observed, a feat incapable with the human eye. Immediately influential in artistic and scientific circles, this precursor to cinema and television dramatically reshaped humanity’s conceptions of culture, information and reality.<br>In the post-industrial era, new developments in networked technologies and artificial intelligence (AI) continue to reshape our perception. Data mining, a form of machine learning, is the generation of rules and information from large swathes of data. In <em>DATA MINDS</em>, this process takes on a more humanistic lens, with each artist mining the personal, cultural, or historical. The works reveal patterns and contradictions in a world increasingly augmented by technology, through common themes of obsession, pop culture, and humanity’s enduring search for truth.<h2>Remembering the future</h2>HIBALL’s two-channel video commission <em>Composition for Mnemosyne</em> (2024) considers the advancements in AI and synthetic media against the backdrop of Newcastle’s shifting technological landscape. Conceived and filmed across two residencies at The Lock-Up, the filmmaker duo examines the influence of technology for the emergent Generation Alpha; those born entirely in the new Millenium.<br>In the first channel, Newcastle-based youth choir The Hunter Singers perform a haunting, discordant choral arrangement, the result of composer Mitchell Mackintosh’s collaboration with generative AI. Led by Kim Sutherland OAM, the choralists use not only their voices, but whispers, body percussion and vocal modulators to recreate the distinctly non-human range of sounds throughout the piece.<br>As the choral piece progresses, a group of teenagers in the second channel traverse a uniquely Novocastrian collection of locations: Newcastle’s Ocean Baths; the RAAF base and Fighter World at Williamtown; and Stockton’s abandoned Fort Wallace. In contrasting scenes of real and synthetic footage – generated frame-by-frame in FLUX1.1 – the teens build paper planes after visiting a military aircraft museum, eventually upgrading to a powerful sparkler bomb. The group’s often frantically paced meanderings seem to hint at an over-arching search for meaning: how can the youth of today make sense of the world of tomorrow? An accompanying suite of UV and lenticular prints extend the coexistence of the augmented and the real, as we contend with the reality of life in an increasingly tech-mediated world.<h2>Articles of obsession</h2>In Roy Ananda’s <em>Evidence wall</em> (2023), the search for meaning is obscured by the search for order. Iterated for the first time outside the artist’s studio, <em>Evidence Wall</em> features some four hundred fictional AI characters from pop culture and mythology. Displayed in a detective-style arrangement of Polaroid-like images, index cards, pins, and string, the work organises a diverse cast of AIs taxonomically via their, quite literal, common threads.<br>AIs are grouped under broad categories, from human-like traits [‘Hedonists’], to functional roles [‘Shipboard Computers’], and more esoteric classifications [‘Entities with Positronic Brains’]. Each AI is fastidiously further analysed, assigned a Myers-Briggs personality type, and linked to others from the same fictional universe.<br>This ‘belligerently analogue’ approach to pattern-recognition can be seen as untangling the very way AIs are trained and developed; a diagram of a neural network presents a similar approach. Given extra charge in The Lock-Up’s historic cells, <em>Evidence wall</em> takes on a conspiratorial air, a rogue detective gone mad in the pursuit of answers.<h2>The hard-boiled search for truth</h2>‘The algorithms shape us as much as we shape them,’ reflects the narrator in Jon Rafman’s 2021 film <em>Punctured Sky</em>. ‘A simple Google search can change the course of your life.’<br>In this major video work, the artist uses internet-sourced imagery to animate a gamer’s desperate search for answers. On a journey steeped in early 2000s ‘internet nostalgia’, Rafman’s protagonist seeks not only the fate of a beloved video game but questions its very existence, probing the darkest corners of the web. Lifting heavily from hard-boiled crime fiction, the narrator’s labyrinthine journey through side quests and red herrings quickly becomes a metaphor for the often futile pursuit of truth online.<br>The accompanying works on canvas (2023), made using the large language model AI generator Midjourney would, by Rafman’s own admission, be impossible to create today. The inherent randomness of AI-generated content, the speed with which each model ‘learns’, and the distinct ‘personality’ of each, means no two AI-generated images will ever be the same. Playing directly into this, Rafman sets brush and acrylic to his canvas before the AI-generated ‘paintings’ are printed. As advanced as the tools and its algorithms are, they retain the inherent qualities of their human creators: unique, unpredictable, and impossible to replicate.<h2>Embrace chaos</h2>Leaning into unpredictability is <em>dirtstyle</em>, a new commission by Girl On Road (2024), which challenges computational precision by embracing decay. For this implementation of dirtstyle ‘tactics’, the artist uses a series of images – personal photographs and web-scraped content – that erode and transform in real time, both on the monitor and into dirt itself.<br>Playing with concepts of digital permanence, Girl On Road reminds us of the physical components behind virtual data. As we watch, the images degrade randomly into bitplanes, a method of data encryption whereby each pixel – white or black – represents a binary value: 0 or 1. In the same way that the images and their corresponding ‘bits’ decay before our eyes, we are forced to reckon with our own conceptions of technology and ephemerality. Uniting the senses of sight, sound and scent (and touch, if you don’t mind getting dirty), Girl On Road encourages viewers to embrace the messiness and beauty of imperfection in technology, grounding it and ourselves in the material world.<h2>Hallucinating the real</h2>Brie Trenerry’s site-specific installation <em>Trip Code</em> (2024), spread out over The Lock-Up’s cells and Exercise Yard, presents a similar embrace of the messy and unpredictable, albeit more nightmarish than accepting. In the same way that AI mines content, Trenerry draws on her own repository of the artistic canon and popular culture – particularly horror cinema – to illustrate the profound impact of social and mass media.<br>Taking cues from the psychological torture cells created by artist Alphonse Laurencic in the Spanish Civil War, <em>Trip Code</em> is a hallucinatory fever-dream of imagery and sensation. Trenerry uses 21st century idioms such as GOAT (Greatest Of All Time), and The Matrix’s ‘red pilling’ as prompts for her videos, generated in the August 2024-released Runway ML Gen 3 Alpha and Turbo, some of the newest in latent diffusion modelling technology.<br>Drawing inspiration The Lock-Up’s padded cell, Trenerry uses Surrealist motifs to create these highly referential torture chambers for the Information Age; a time where conspiracy theories and algorithmic bias seem to dictate daily life and society. Toxic-yellow cabling features prominently throughout as a material symbol of networked technologies. Seeping into reality, they achieve final form in the building’s Exercise Yard: the sculpture – made from 2 km of network cables – the symbolic cerebrum at the centre of Trenerry’s creations.<h2>***</h2>In an era defined by AI, data and networks, <em>DATA MINDS</em> highlights how these systems, though human-made, profoundly shape and reflect our perceptions, obsessions, and culture. By inviting us to embrace the messy, ephemeral, and unpredictable aspects of both AI and human experience, the artists challenge us to imagine new possibilities for creativity, connection, and understanding. In a world transformed by data, perhaps our imaginations can finally be used to perceive reality. And no, ChatGPT did not write this essay. But it did help.<br><br>With artists Roy Ananda, Girl On Road, HIBALL, Jon Rafman and Brie Trenerry.<br><em>DATA MINDS</em> is curated by Wednesday Sutherland, assisted by Alexandra Kirwood<br><br><em>This project has been assisted by the Australian Government through Creative Australia, its principal arts investment and advisory body; the Victorian Government through Creative Victoria; and The Lock-Up’s Artist in Residence program.</em>",
  },
  {
    name: "Curators",
    images: Object.values(artwork2),
    text: '<h2>About Wednesday Sutherland:</h2>Wednesday Sutherland is an independent arts worker, curator and artist living and working in Muloobinba/Newcastle, AU. Throughout her artistic and curatorial practice is a focus on the crossover between analogue processes and contemporary technologies. Her largely photomedia-based work is often iterative and autobiographical, exploring personal and historical notions of memory, grief and loss. Wednesday is an active member of WHIP Collective, a group of women-identifying professional photographers in the Hunter region. Currently working freelance, she has previously held positions at Runway Journal, Gadigal Land/Sydney, and The Lock-Up, Newcastle. Wednesday holds a Bachelor of Creative Industries (Visual Arts) with Distinction, University of Newcastle.<br><br><a href=”[https://instagram.com/wednesdaysutherland](https://www.wednesdaysutherland.com/)” target=”_blank”>https://www.wednesdaysutherland.com/</a><br><a href=”https://instagram.com/wednesdaysutherland” target=”_blank”>@wednesdaysutherland</a><h2>About Alexandra Kirwood (HIBALL):</h2>Alexandra Kirwood is a researcher and image-maker and a former Researcher in Residence at ACMI X. Her creative practice research explores relationships between bodies and images in the context of art, fashion, performance, and digital technologies. She aims to question image consumption, the role of new technology, and digital representations of bodies to uncover the social implications of image-making. She recently completed a Master in Design at RMIT titled  \'Time-Images and Digital Fashion Sculpture\', from which she graduated with high distinction. She has worked with architectural firms OCTA and Grimshaw Architects to create large-scale site-specific public video works, including Significant Surfaces (2022) and Floating Bodies (2021). Currently, Alexandra is a sessional lecturer and course coordinator at RMIT in the Bachelor of Fashion (Design).<br /><br /> <a href="https://www.instagram.com/alexandrakirwood/" target="_blank">@alexandrakirwood</a>',
  },
];
const label = ["Exhibition\nInformation"];

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

  const totalNodes = loadedArtworks.length + 3; // Total number of artworks + 1 statement
  const angleStep = 180 + (2 * Math.PI) / totalNodes;

  return (
    <Node
      position={position}
      label={label[0]}
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "DATA MINDS",
          pageUrl: "/exhibition/",
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
                <u>
                  With artists Roy Ananda, Girl On Road, HIBALL, Jon Rafman and
                  Brie Trenerry.
               </u>
                <br />
                   <br />
                <u>
                  <em>DATA MINDS</em> is curated by Wednesday Sutherland,
                  assisted by Alexandra Kirwood
               </u>
                <br />
                <br />
                
           
                  This project has been assisted by the Australian Government
                  through Creative Australia, its principal arts investment and
                  advisory body; the Victorian Government through Creative
                  Victoria; and The Lock-Up’s Artist in Residence program.
              
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
              pageUrl: `/exhibition/${artwork.name}/`,
              content: [
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

export default DataMinds;
