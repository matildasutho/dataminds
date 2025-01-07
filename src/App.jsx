import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ArtistPage from "./components/Artists/ArtistPage";
import ArtworkPage from "./components/Artists/ArtworkPage";
import Footer from "./components/Footer/Footer";
import { fetchData } from "./fetchContentful";
import "./App.css";

const App = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await fetchData();
        // console.log("Fetched artists data:", data.artistCollection.items);
        setArtists(data.artistCollection.items);
      } catch (error) {
        // console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleNodeClick = (content) => {
    // console.log("Node clicked:", content);
    if (content.pageUrl) {
      navigate(content.pageUrl);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage artists={artists} handleNodeClick={handleNodeClick} />
          }
        />
        <Route path="/:slug/" element={<ArtistPage artists={artists} />} />
        <Route
          path="/:artistSlug/:artworkSlug"
          element={<ArtworkPage artists={artists} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
