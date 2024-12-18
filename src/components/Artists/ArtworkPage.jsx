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

  const handleBackClick = () => {
    if (window.history.length <= 1) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="subpage">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <h1>{artwork.title}</h1>
      <div className="flex-container">
        <div className="left-column">
          {artwork.imagesCollection.items.map((item, index) => {
            if (item.contentType.startsWith("video/")) {
              return (
                <video key={index} controls>
                  <source src={item.url} type={item.contentType} />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return (
                <img
                  key={index}
                  src={item.url}
                  alt={`${artwork.title} ${index + 1}`}
                  onClick={() => handleImageClick(item.url)}
                />
              );
            }
          })}
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
