import React, { useEffect, useState } from "react";
import "./Instructions.css";

function Instructions() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 1000); // Change visibility every second
    const timeout = setTimeout(() => {
      setHidden(true);
    }, 8000); // Hide after 15 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = () => {
    setHidden(true);
  };

  return (
    !hidden && (
      <div
        className={`instructions ${visible ? "visible" : "hidden"}`}
        onClick={handleClick}
      >
        {isMobile ? (
          <>
            Tap and drag to rotate the scene
            <br />
            Use two fingers to navigate. pinch to zoom
          </>
        ) : (
          <>
            Hold Shift + Click and Drag to navigate the scene
            <br />
            Scroll to zoom in and out
          </>
        )}
      </div>
    )
  );
}

export default Instructions;
