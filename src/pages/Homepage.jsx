import React, { useEffect, useState } from "react";
import CanvasPage from "./CanvasPage";
import ArtistListPage from "./ArtistListPage";
import "./CanvasPage.css";

const Homepage = ({ artists, handleNodeClick }) => {
  const [isListView, setIsListView] = useState(() => {
    const savedView = localStorage.getItem("isListView");
    return savedView === "true";
  });

  useEffect(() => {
    // Save the view state to localStorage whenever it changes
    localStorage.setItem("isListView", isListView);
    console.log(`isListView changed to: ${isListView}`);
  }, [isListView]);

  const toggleViewMode = () => {
    setIsListView((prev) => {
      console.log("Previous isListView:", prev);
      const newIsListView = !prev;
      console.log("New isListView:", newIsListView);
      return newIsListView;
    });
  };

  return (
    <div>
      <div className="view-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={isListView}
            onChange={toggleViewMode}
            aria-checked={isListView}
            aria-label="Toggle between mindmap view and list view"
          />
          <span className="slider" aria-hidden="true"></span>
        </label>
        <span className="view-label">
          <h4>
            {isListView
              ? "Mind Map / [ List View ]"
              : "[ Mind Map ] / List View"}
          </h4>
        </span>
      </div>
      {isListView ? (
        <ArtistListPage artists={artists} />
      ) : (
        <CanvasPage artists={artists} handleNodeClick={handleNodeClick} />
      )}
    </div>
  );
};

export default Homepage;
