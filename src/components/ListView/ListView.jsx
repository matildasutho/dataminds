import React, { useState } from "react";
import "./ListView.css";

const artists = [
  {
    name: "Roy Ananda",
    artworks: ["Evidence Wall"],
  },
  {
    name: "HIBALL",
    artworks: ["Composition for Mnemosyne"],
  },
  // Add more artists and their artworks here
];

function ListView({ onNodeClick, onClose }) {
  const [expandedArtist, setExpandedArtist] = useState(null);

  const handleArtistClick = (artist) => {
    setExpandedArtist(artist === expandedArtist ? null : artist);
  };

  return (
    <div className="list-view">
      <button className="list-view-close" onClick={onClose}>
        Close
      </button>
      <h2>Artists and Artworks</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.name}>
            <button onClick={() => handleArtistClick(artist.name)}>
              {artist.name}
            </button>
            {expandedArtist === artist.name && (
              <ul>
                {artist.artworks.map((artwork) => (
                  <li key={artwork}>
                    <button
                      onClick={() =>
                        onNodeClick({
                          type: "artwork",
                          artistName: artist.name,
                          pageUrl: `/${artist.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/${artwork
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`,
                          content: (
                            <div>
                              <h3>{artwork}</h3>
                              <p>Content for {artwork}</p>
                            </div>
                          ),
                        })
                      }
                    >
                      {artwork}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListView;
