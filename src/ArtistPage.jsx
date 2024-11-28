import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const convertSlugToName = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ArtistPage = () => {
  const { artistSlug, artworkSlug } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const artistName = convertSlugToName(artistSlug);
      let component;
      try {
        component = await import(`./components/Artists/${artistName}`);
      } catch (error) {
        console.error("Error loading component:", error);
        component = null;
      }
      if (component && component.default) {
        setContent(() => component.default);
      }
    };
    loadComponent();
  }, [artistSlug, artworkSlug]);

  return (
    <div>
      {content ? (
        React.createElement(content, { artworkSlug })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArtistPage;
