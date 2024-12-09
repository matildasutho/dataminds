import React from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

function Popup({ content, onClose }) {
  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case "biography":
        return (
          <>
            <div className="artist-header">
              <h1>{content.artistName}</h1>
            </div>
            <div className="popup-content">{content.content}</div>
          </>
        );
      case "artwork":
        return (
          <>
            <div className="artist-header">
              <h1>{content.artistName}</h1>
            </div>
            <div className="popup-content">{content.content}</div>
          </>
        );
      case "exhibition":
        return (
          <>
            <div className="popup-content">
              <h2>Data Minds Exhibition</h2>
              <p>
                Welcome to the Data Minds exhibition. This exhibition explores
                the intersection of art, technology, and human experience.
                Through a combination of visual art, sound, and interactive
                installations, Data Minds creates immersive experiences that
                challenge perceptions and provoke thought. The projects often
                involve collaborations with other artists and technologists,
                resulting in innovative and multidisciplinary works.
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="popup">
      <button className="popup-close" onClick={onClose}>
        Close
      </button>
      {renderContent()}
    </div>,
    document.body
  );
}

export default Popup;
