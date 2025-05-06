import React from "react";
import HeroSection from "../components/Hero";
import "../components/styling/Hero.css";
import HowItWorks from "../components/HowItWorks";
import "../components/styling/HowItWorks.css";
import "../components/styling/Home.css";

import GalleryGrid from "../components/GalleryGrid";
import Slideshow from "../components/Slideshow";

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      {/* Additional home content can be added here later */}
      <HowItWorks />
      <GalleryGrid />
      <Slideshow />
    </div>
  );
};

export default Home;
