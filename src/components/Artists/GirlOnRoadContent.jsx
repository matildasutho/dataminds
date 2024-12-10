import React, { useState, useEffect } from "react";
import "src/components/Artists/wrapper.css";
const GirlOnRoadContent = ({ artworkSlug, artworks, handleClose }) => {
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const [fullPageImage, setFullPageImage] = useState(null);

  if (artworkSlug) {
    const artwork = artworks.find((a) => generateSlug(a.name) === artworkSlug);

    if (!artwork) {
      console.error(`Artwork not found for slug: ${artworkSlug}`);
      return <p>Artwork not found</p>;
    }

    return (
      <div className="popup">
        <div className="artist-header">
          <h1>{artwork.name}</h1>
        </div>
        <div className="popup-content">
          <div className="left-column artwork-gallery">
            {artwork.images.map((importFn, index) => {
              const [imageSrc, setImageSrc] = useState(null);

              useEffect(() => {
                const loadImage = async () => {
                  const module = await importFn();
                  setImageSrc(module.default);
                };
                loadImage();
              }, [importFn]);

              return (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`${artwork.name} ${index + 1}`}
                  onClick={() => setFullPageImage(imageSrc)}
                />
              );
            })}
          </div>
          <div className="right-column">
            <p dangerouslySetInnerHTML={{ __html: artwork.text }} />
            <p dangerouslySetInnerHTML={{ __html: artwork.statement }} />
          </div>
        </div>
        {fullPageImage && (
          <div
            className="full-page-image"
            onClick={() => setFullPageImage(null)}
          >
            <img src={fullPageImage} alt="Full Page" />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default GirlOnRoadContent;
