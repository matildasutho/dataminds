import React from "react";
import "./footer.css";

function Footer({ isRandomView, toggleView }) {
  return (
    <footer className="footer">
      <div>
        <h4>
          DATA MINDS exhibition, at The Lock-Up, Newcastle. © 2024.
          <br />
          Built by{" "}
          <a
            href="https://girlonroad.tech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Girl On Road
          </a>
        </h4>
      </div>
      <div>
        <label className="switch">
          <input
            type="checkbox"
            checked={isRandomView}
            onChange={toggleView}
            aria-checked={isRandomView}
            aria-label="Toggle between random view and flat view"
          />
          <span className="slider" aria-hidden="true"></span>
        </label>
      </div>
    </footer>
  );
}

export default Footer;
