import React, { useEffect } from "react";
import gsap from "gsap";
import trailImage from "../assets/trail_01.avif";
import triangleIcon from "../assets/triangle.svg";
import logoIcon from "../assets/logo.svg";
import "../components/styling/Hero.css";

const trailSayings = [
  "We hike, we vibe, we conquer. Trails aren't for the lazy, they're for the legends.",
  "Touch grass… like, literally. Trails are waiting.",
  "Less doomscrolling, more trail strolling.",
  "For those who'd rather get dirt on their boots than dust on their couch.",
  "Zero bars, full vibes. Take a hike.",
  "Step outside. The only filter you need is fresh air.",
  "Built for the bold. Trails don't walk themselves.",
  "Move your feet, free your mind. Trails hit different.",
  "Not all paths are straight, but they're all worth walking.",
  "Trails don’t ask questions, they give answers.",
];

const HeroSection = () => {
  const repeatedSayings = Array(3).fill(trailSayings).flat();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    tl.from(".hero-background", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })

      .from(".hero-overlay", { opacity: 0 }, "-=1")
      .from(".hero-content", { y: 50, opacity: 0 }, "-=0.5")
      .from(".triangle", { scale: 0.5, opacity: 0, stagger: 0.2 }, "-=0.5")
      .from(".hero-text", { opacity: 0, y: 30, stagger: 0.2 }, "-=0.4")
      .from(".hero-text-mobile", { opacity: 0, y: 30 }, "-=0.6")
      .from(".marquee-banner", { opacity: 0, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <div className="hero-container">
      <img src={trailImage} alt="Trail Adventure" className="hero-background" />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <img src={logoIcon} alt="Logo" className="center-logo" />
        <h2 className="hero-tagline">Find Your Path. Leave Your Mark.</h2>
        <a href="/trailgrounds" className="hero-cta">
          Explore Trails
        </a>
        <p className="hero-subtext">
          Discover, share, and rate hiking adventures. Built for trail junkies,
          not couch potatoes.
        </p>
      </div>

      <img
        src={triangleIcon}
        alt="Triangle"
        className="triangle triangle-left"
      />
      <img
        src={triangleIcon}
        alt="Triangle"
        className="triangle triangle-right"
      />

      <h1 className="hero-text hero-text-left">Trails</h1>
      <h1 className="hero-text hero-text-right">Hiking</h1>
      <h1 className="hero-text-mobile">Trails Hiking</h1>

      <div className="marquee-banner">
        <div className="marquee-track">
          {repeatedSayings.concat(repeatedSayings).map((saying, index) => (
            <p key={index} className="marquee-text">
              {saying}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
