import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import RoyAnandaWrapper from "src/components/Artists/RoyAnandaWrapper.jsx";
import BrieTrenerryWrapper from "src/components/Artists/BrieTrenerryWrapper.jsx";
import HiballWrapper from "src/components/Artists/HiballWrapper.jsx";
import GirlOnRoadWrapper from "src/components/Artists/GirlOnRoadWrapper.jsx";
import JonRafmanWrapper from "src/components/Artists/JonRafmanWrapper.jsx";
import "src/components/Artists/ArtistPage.css"; // Import CSS for fade-in effect

const convertSlugToName = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ArtistPage = () => {
  const { artistSlug, artworkSlug } = useParams();
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const artistName = convertSlugToName(artistSlug).replace(/\s+/g, "");
    // console.log("Loading component for artist:", artistName); // Debug statement

    switch (artistName) {
      case "RoyAnanda":
        setComponent(() => RoyAnandaWrapper);
        break;
      case "BrieTrenerry":
        setComponent(() => BrieTrenerryWrapper);
        break;
      case "Hiball":
        setComponent(() => HiballWrapper);
        break;
      case "GirlOnRoad":
        setComponent(() => GirlOnRoadWrapper);
        break;
      case "JonRafman":
        setComponent(() => JonRafmanWrapper);
        break;
      default:
        console.error("Artist component not found:", artistName);
        setComponent(null);
    }
  }, [artistSlug, artworkSlug]);

  return (
    <div className="artist-page">
      {Component ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Component artworkSlug={artworkSlug} />
        </Suspense>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArtistPage;
