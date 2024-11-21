import React, { useEffect, useState } from "react";
import Node from "../../Node";

// Import all images from the respective directories using import.meta.glob
const artwork1 = import.meta.glob(
  "./assets/Brie_Trenerry/Miss_Dis/*.{png,jpg,jpeg,svg}"
);
const artwork2 = import.meta.glob(
  "./assets/Brie_Trenerry/Trip_Code/*.{png,jpg,jpeg,svg}"
);
const artwork3 = import.meta.glob(
  "./assets/Brie_Trenerry/Yard_Installation/*.{png,jpg,jpeg,svg}"
);

const artworks = [
  {
    name: "Miss Dis",
    images: Object.values(artwork1),
    text: "Brie Trenerry, <em>Miss Dis</em>, 2024. <br>Hologram, 3D render, video colour ",
  },
  {
    name: "Trip Code",
    images: Object.values(artwork2),
    text: "Brie Trenerry, <em>Trip Code</em>, 2024. <br>AI generated 4K video, colour, sound",
  },
  {
    name: "Yard Installation",
    images: Object.values(artwork3),
    text: "Brie Trenerry, <em>TITLE TBC</em>, 2024. <br>CAT5 network cable, foam [TBC], dimensions variable",
  },
];

function BrieTrenerry({ onNodeClick, position, rotate }) {
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
      label="Brie Trenerry"
      rotate={rotate}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick({
          type: "biography",
          artistName: "Brie Trenerry",
          content: (
            <div>
              <img
                src="../../assets/Jon_Rafman/image1.jpg"
                alt="Brie Trenerry"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: `
                   Brie Trenerry is a Melbourne-based interdisciplinary artist, filmmaker, curator and educator with a focus on the moving image and new media who has exhibited extensively both in Australia and internationally. She has worked as the curator of the video space at MARS Gallery since its opening in 2014. Trenerry is completing her PhD, which explores altered states of consciousness and collaboration as generative strategies for an expanded cinema.
<br>
<br>
Trenerry‘s recent solo exhibition <em>BABBLE ON</em> at MARS Gallery, Melbourne, explored the profound social, cultural and political implications of AI interventions in the mainstream media. She has worked as a lecturer in video, new media and fashion film at Photography Studies College (PSC), Victorian College of the Arts (VCA) and the Royal Melbourne Institute of Technology (RMIT). Brie has been the recipient of residencies at the Australian Experimental Art Foundation in Adelaide 2015, the Australian Archaeological Institute at Athens (AAIA) Contemporary Creative Residency via the University of Sydney 2018 and KdMoFA (Kuandu Museum of Fine Art), TNUA (Taiwan National University of the Arts, RMIT:ART:INTERSECT 2019.
<br>
<br>
<a href="https://www.brietrenerry.com/" target="_blank>https://www.brietrenerry.com/</a>
<br>
<br>
<a href="https://www.instagram.com/argento6" target="_blank>@argento6</a>


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
        label="Text: Trenerry's Panopticon"
        scale={[1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick({
            type: "statement",
            artistName: "Brie Trenerry",
            content: (
              <div>
                <img
                  src={
                    "./components/Artists/assets/Brie_Trenerry/Mis_Dis/HIBALLCOM_12 web.png"
                  }
                  alt="Brie Trenerry"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: `
                     Words: Dr. Ashley Crawford

Brie Trenerry has always been an obsessive artist, and with obsession tends to come extensive research. The problem with research in the age of mutilated transfer transmission is that it is all too often mediated through the tortured byways of social media and artificial intelligence. So Trenerry, being Trenerry, tackled her new commission for the exhibition <em>DATA MINDS</em> as a multiplicity of multi-layered installations titled <em>Trip Code</em>, as she does everything: as a forensic snoop, a deranged art historian, and an aesthetic vagabond. Like Seth Brundle in <em>The Fly</em>, she crawled—albeit largely virtually—through every nook and cranny of The Lock Up, reimagining every space as a conduit, a home, and, of course, a prison for her eccentric host of often demonic denizens.

<br><br>

When creating video via Artificial Intelligence software, an image and/or text prompt is required—just enough training material for the AI to conjure juxtaposed imagery as the basis to form a narrative. Like Salvador Dalí smoking too much hashish, the weirder the juxtaposition, the stranger the result can be—just like a <em>Trip Code</em>, deceiving both the viewer and the creator alike. But Trenerry also had a gut response to the space’s title. The Lock-Up, whilst referring to its history as a prison, could also reference the history of psychiatric confinement, as thoroughly tackled in Michel Foucault’s <em>Madness and Civilization: A History of Insanity in the Age of Reason</em> (1961). Foucault made powerful use of Jeremy Bentham’s 18th century Panopticon, a design (though never physically built) that allowed minimal guards to observe a large number of inmates, relying on the notion that once prisoners know they may always be watched, they begin to watch themselves—much like the protagonists in George Orwell’s <em>1984</em> (1949). Thus, we, the viewers of Trenerry’s <em>Trip Code</em>, may in fact be inmates of the Panopticon.

<br><br>

But we are there by choice. Incarceration amidst abstracted contemporary art would have been literal hell for the likes of Adolf Hitler or Donald Trump, but evidently, such speculative architectural concepts were alive and well during the Spanish Civil War. Although contentious, it has been claimed that anarchist forces made use of modern art during this tumultuous period, borrowing the ideas of Bauhaus-affiliated artists and Surrealists to design psychological torture chambers.

<br><br>

This story was uncovered in the early 2000s by José Milicua, a Spanish art historian who evidently discovered, through records from the Spanish Civil War, the testimony of a French architect turned revolutionary, Alphonse Laurencic. It gained extra frisson when re-reported by <em>The New York Times’s</em> John Rockwell in 2003.

<br><br>

The anarchists were fighting against the fascist forces of Franco. Fascists infamously despised modern art, referring to it as ‘degenerate.’ “A celebration of everything that was unnatural and unpleasant,” wrote Rockwell, noting the inherent irony that: “While the fascists could not have been more wrong about true modern artists, they would have been right in viewing Laurencic’s creations as aesthetic abominations. By deviating from modernism’s original intentions, Laurencic nearly affirmed the philistinism of his fascist enemy.” [1]

<br><br>

In Laurencic’s cells, beds would be placed at uncertain angles, preventing comfortable purchase for the prisoner to sleep comfortably. Abstracted blocks would be placed on the floor to make maneuverability nigh impossible. Disorienting, surreal patterns were inscribed on the walls. Temporal experience was manipulated, casino-like, via distorted timekeepers. Lighting in the diminutive spaces alternated between green and red to further disorient and distress.  Laurencic had conceived of a living hell through art.

<br><br>

In Trenerry’s reimagining, a hologram in a padded cell is titled <em>Miss Dis</em> and features 3D-rendered interpretations of <em>Un Chien Andalou</em>, which was evidently also screened as a torture device in the ‘Chekas’ where Laurencic’s cells were housed; detention centres modelled on Soviet designs for incarceration and imported during the Spanish Civil War by anarchist revolutionaries. This is horrendously apt: even if you’re not a prisoner, watching segments of <em>Un Chien Andalou</em> is indeed a provocation, if not outright torture.

<br><br>

“I’m working with imagery based on accounts and reconstructions of the modern art Chekas—apparently (reports have been contested) — used by anarchists to torture fascists, as a basis for my AI-generated videos,” says Trenerry. “I’m making a connection between the use of modern art as torture in the early 20th century and the use of social media and AI in contemporary media and politics, which have exacerbated a type of screen-based solitary existence that manifests as a warped experience of reality in our current post-truth world.”

<br><br>

In essence, Trenerry has reinterpreted Foucault’s Panopticon via AI. The connective tissue across the labyrinthine works assume the form of yellow network cables generated in Runway ML’s Gen 3 Alpha/Turbo in various forms that seem to have a life of their own as they infiltrate every AI spawned space- a sinuous simulacrum of a nervous-system. A sculpture in The Lock-Up’s former exercise yard comprised of 1km of yellow CAT 5 network cables wrapped around garbage bags of manufactured detritus is also featured – The Panopticon’s ‘brain’ or the disembodied, pulsating encephalon in David Lynch’s <em>Twin Peaks</em>.

<br><br>

“From deepfakes to the proliferation of cute animal pics/vids on X sitting alongside conspiracy rants based on red/blue-pilling beliefs and polarised political posturing, user-created wellness content, and sly, obscure film references including Piero Pasolini’s 1975 <em>Salo</em>, Peter Greenaway’s 1985 <em>A Zed and Two Noughts</em>,  Lily Ana Amipour’s 2016 <em>The Bad Batch</em> or Coralie Fargeat’s 2024 appropriation heavy <em>The Substance</em>- nothing is off limits as a prompt” Trenerry says. “References to the imagistic code used by conspiracist Q devotees like ‘WWG1WGA,’ ‘the storm is coming,’ ‘breadcrumbs,’ etc., all feed into the ‘dream machine’ to create the hallucinogenic imagery, exhibited across two cells. Images of The Lock-Up’s own repurposed chambers in Newcastle were also exploited as prompts for many of the video iterations.”

<br><br>

Looking through Trenerry’s <em>Trip Code</em>, one may go so far as to recall The Prisoner, the 1967 British television series created by Patrick McGoohan, in which he portrays Number Six, an unnamed British intelligence agent who is abducted and imprisoned in a bizarre coastal village. His attempts to escape trigger a "trip code," leading to hallucinogenic obstructions. Brim full of paranoia, it is a truly Kafkaesque ‘trip,’ perhaps not unlike a visit to The Lock-Up in its current incarnation, as host to <em>DATA MINDS</em>.

<br><br>

1. John Rockwell, ‘Has Modern Art Always Been Torture?’  <em>The New York Times</em>, 2003 <a href=”https://www.nytimes.com/2003/03/30/arts/art-architecture-has-modern-art-always-been-torture.html” target=”_blank”>https://www.nytimes.com/2003/03/30/arts/art-architecture-has-modern-art-always-been-torture.html</a>                   `,
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
              artistName: "Brie Trenerry",
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

export default BrieTrenerry;
