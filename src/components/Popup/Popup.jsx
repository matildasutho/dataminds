import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

function Popup({ content, onClose }) {
  const [popupContent, setPopupContent] = useState(null);
  const [fullPageImage, setFullPageImage] = useState(null);

  useEffect(() => {
    console.log("Popup content updated:", content); // Debug statement
    setPopupContent(content);
  }, [content]);

  const handleImageClick = (imageSrc) => {
    setFullPageImage(imageSrc);
  };

  const handleFullPageImageClick = () => {
    setFullPageImage(null);
  };

  const renderContent = () => {
    if (!popupContent) return null;

    switch (popupContent.type) {
      case "biography":
      // case "statement":
      //   return (
      //     <>
      //       <div className="artist-header">
      //         <h1>{popupContent.artistName}</h1>
      //       </div>
      //       <div className="popup-content">
      //         <div className="left-column">
      //           <img
      //             src={popupContent.content.props.children[0].props.src}
      //             alt="Artist"
      //           />
      //         </div>
      //         <div className="right-column">
      //           {popupContent.content.props.children[1]}
      //         </div>
      //       </div>
      //     </>
      //   );
      case "artwork":
        return (
          <>
            <div className="artist-header">
              <h1>{popupContent.artistName}</h1>
            </div>
            <div className="popup-content">
              <div className="left-column artwork-gallery">
                {popupContent.content
                  .filter((item) => item.type === "img")
                  .map((item, index) => (
                    <img
                      key={index}
                      src={item.props.src}
                      alt={`Artwork ${index + 1}`}
                      onClick={() => handleImageClick(item.props.src)}
                    />
                  ))}
              </div>
              <div className="right-column">
                {popupContent.content.filter((item) => item.type === "p")}
              </div>
            </div>
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
      {fullPageImage && (
        <div className="full-page-image" onClick={handleFullPageImageClick}>
          <img src={fullPageImage} alt="Full Page" />
        </div>
      )}
    </div>,
    document.body
  );
}

export default Popup;
