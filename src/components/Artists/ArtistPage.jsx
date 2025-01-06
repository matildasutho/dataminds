import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import FooterText from "../Footer/FooterText";
import "./Pages.css";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const ArtistPage = ({ artists }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loadedArtworks, setLoadedArtworks] = useState([]);

  useEffect(() => {
    const foundArtist = artists.find(
      (artist) => generateSlug(artist.artistName) === slug
    );
    setArtist(foundArtist);
  }, [artists, slug]);

  useEffect(() => {
    if (artist) {
      const loadImages = async () => {
        const loaded = await Promise.all(
          artist.artworksCollection.items.map(async (artwork) => {
            const images = artwork.imagesCollection.items.map(
              (image) => image.url
            );
            return { ...artwork, images };
          })
        );
        setLoadedArtworks(loaded);
      };

      loadImages();
    }
  }, [artist]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    if (window.history.length <= 1) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <div className="subpage">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <h1>{artist.artistName}</h1>
        <div className="rich-text">
          {documentToReactComponents(artist.artistBiography.json)}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ArtistPage;
