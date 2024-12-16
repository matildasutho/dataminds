import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ArtistListPage.css";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const ArtistListPage = ({ artists }) => {
  const [expandedArtist, setExpandedArtist] = useState(null);

  const toggleArtist = (artistName) => {
    setExpandedArtist((prev) => (prev === artistName ? null : artistName));
  };

  // Sort artists by listOrder
  const sortedArtists = [...artists].sort((a, b) => a.listOrder - b.listOrder);

  return (
    <div className="artist-list-page">
      <div className="dm-title">Data Minds</div>
      <ul>
        {sortedArtists.map((artist) => {
          const artistSlug = generateSlug(artist.artistName);
          const isExpanded = expandedArtist === artist.artistName;
          return (
            <React.Fragment key={artist.artistName}>
              <li>
                <div onClick={() => toggleArtist(artist.artistName)}>
                  <h3>&#9658; {artist.artistName}</h3>
                </div>
              </li>
              {isExpanded && (
                <ul className="artwork-list">
                  <li>
                    <h3>
                      <Link to={`/${artistSlug}`}>&#9658; Biography</Link>
                    </h3>
                  </li>
                  {artist.artworksCollection.items.map((artwork) => {
                    const artworkSlug = generateSlug(artwork.title);
                    return (
                      <li key={artwork.title}>
                        <h3>
                          <Link to={`/${artistSlug}/${artworkSlug}`}>
                            &#9658; {artwork.title}
                          </Link>
                        </h3>
                      </li>
                    );
                  })}
                </ul>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default ArtistListPage;
