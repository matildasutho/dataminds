import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const ArtworkPage = ({ artists }) => {
  const { artistSlug, artworkSlug } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [fullPageImage, setFullPageImage] = useState(null);

  useEffect(() => {
    const foundArtist = artists.find(
      (artist) => generateSlug(artist.artistName) === artistSlug
    );
    if (foundArtist) {
      const foundArtwork = foundArtist.artworksCollection.items.find(
        (artwork) => generateSlug(artwork.title) === artworkSlug
      );
      setArtwork(foundArtwork);
    }
  }, [artists, artistSlug, artworkSlug]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (url) => {
    setFullPageImage(url);
  };

  const handleCloseFullPageImage = () => {
    setFullPageImage(null);
  };

  return (
    <div className="subpage">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{artwork.title}</h1>
      <div className="flex-container">
        <div className="left-column">
          {artwork.imagesCollection.items.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${artwork.title} ${index + 1}`}
              onClick={() => handleImageClick(image.url)}
            />
          ))}
        </div>
        <div className="right-column">
          {documentToReactComponents(artwork.artworkDescription.json)}
        </div>
      </div>
      {fullPageImage && (
        <div className="full-page-image" onClick={handleCloseFullPageImage}>
          <img src={fullPageImage} alt="Full Page View" />
        </div>
      )}
    </div>
  );
};

export default ArtworkPage;
