// components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./styling/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <span className="footer-year">
          2025 © TRAILSHIKING. All Rights Reserved
        </span>

        <div className="footer-links">
          <Link to="/updates">Updates & Fixes</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <h1 className="footer-logo">TRAILS-HIKING</h1>
      </div>
    </footer>
  );
};

export default Footer;
