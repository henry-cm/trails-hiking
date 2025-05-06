// components/Banner.jsx
import React from "react";
import "../components/styling/Banner.css"; // or wherever your shared styles live

function Banner({ image, title, altText = "Banner Image", className = "" }) {
  return (
    <div className={`banner ${className}`}>
      <img src={image} alt={altText} className="banner-image" />
      <h1 className="title">{title}</h1>
    </div>
  );
}

export default Banner;

// Usage in another component:

// import bannerImage from "../assets/trail_02.avif";
// import Banner from "../components/Banner";

//    <Banner image={bannerImage} title="ABOUT" altText="About Banner" />;
