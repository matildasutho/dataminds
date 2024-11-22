import React from "react";
import "./footer.css";

function Footer({ isRandomView, toggleView }) {
  return (
    <footer className="footer">
      <h4>
        © 2024 Wednesday Sutherland. Built by{" "}
        <a
          href="https://girlonroad.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Girl On Road
        </a>
      </h4>
      <label className="switch">
        <input type="checkbox" checked={isRandomView} onChange={toggleView} />
        <span className="slider"></span>
      </label>
      <p>{isRandomView ? "Random View" : "Flat View"}</p>
    </footer>
  );
}

export default Footer;
