// pages/Updates.jsx

import React from "react";
import Banner from "../components/Banner";
import "../components/styling/Updates.css";
import bannerImage from "../assets/trail_02.avif";

const Updates = () => {
  return (
    <>
      <Banner image={bannerImage} title="Updates" altText="About Banner" />
      <div className="updates-page">
        <div className="updates-content">
          <h1 className="version-title">Version 1.0</h1>

          <section className="update-section">
            <h2>🟡 Features Added</h2>
            <ul>
              <li>Added ClusterMap for interactive trail navigation</li>
              <li>TrailCard and TrailList redesigned with responsive layout</li>
              <li>Trailgrounds page connected to backend API</li>
              <li>Login system with email/username and frontend validation</li>
              <li>
                Secure trail submission with location, elevation, and image
              </li>
            </ul>
          </section>

          <section className="update-section">
            <h2>🔧 Fixes Made</h2>
            <ul>
              <li>Resolved login-state persistence issue between routes</li>
              <li>Standardized banner and marquee into components</li>
              <li>Ensured trail popup links and map style integration</li>
              <li>Synced trail card heights for visual consistency</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Updates;
