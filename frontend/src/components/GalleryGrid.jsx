import React, { useState, useEffect } from "react";
import "./styling/GalleryGrid.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Import images manually
import img1 from "/src/assets/01_1.jpg";
import img2 from "/src/assets/01_2.jpg";
import img3 from "/src/assets/01_3.jpg";
import img4 from "/src/assets/01_4.jpg";
import img5 from "/src/assets/01_5.jpg";
import img6 from "/src/assets/01_6.jpg";
import img7 from "/src/assets/01_7.jpg";
import img8 from "/src/assets/01_8.jpg";
import img9 from "/src/assets/01_9.jpg";
import img10 from "/src/assets/01_10.jpg";

const images = [
  { src: img1, link: "/trailgrounds/67deebfb7eb468d46ddf0eec" },
  { src: img2, link: "/trailgrounds/67deeeded2bb30047b4ae02b" },
  { src: img3, link: "/trailgrounds/67deef51d2bb30047b4ae041" },
  { src: img4, link: "/trailgrounds/67e04e93d2bb30047b4ae061" },
  { src: img5, link: "/trailgrounds/67e04ee8d2bb30047b4ae06e" },
  { src: img6, link: "/trailgrounds/67e065ffd2bb30047b4ae07c" },
  { src: img7, link: "/trailgrounds/67e06664d2bb30047b4ae08b" },
  { src: img8, link: "/trailgrounds/67e066d4d2bb30047b4ae0bf" },
  { src: img9, link: "/trailgrounds/67e0671ed2bb30047b4ae0d0" },
  { src: img10, link: "/trailgrounds/67e0678ad2bb30047b4ae0e2" },
];

const GalleryGrid = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen width is below 800px
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Duplicate images so the carousel can loop seamlessly.
    const carouselImages = [...images, ...images];
    return (
      <div className="gallery-carousel-wrapper">
        <div className="gallery-carousel">
          {carouselImages.map((img, index) => (
            <a href={img.link} key={index} className="carousel-item">
              <img src={img.src} alt={`Trail ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Desktop grid layout remains unchanged
  const gridSize = 4; // 4x4 grid
  const gridItems = Array(gridSize * gridSize).fill(null);
  const availableRows = [0, 1, 2, 3];

  images.forEach((image) => {
    let placedImage = false;
    while (!placedImage && availableRows.length > 0) {
      const rowIndex =
        availableRows[Math.floor(Math.random() * availableRows.length)];
      const startIdx = rowIndex * gridSize;
      const rowCells = gridItems.slice(startIdx, startIdx + gridSize);
      const filledInRow = rowCells.filter(Boolean).length;

      if (filledInRow < 2) {
        let possibleIndices = [];
        for (let i = 0; i < gridSize; i++) {
          const idx = startIdx + i;
          if (!gridItems[idx]) {
            possibleIndices.push(idx);
          }
        }
        if (possibleIndices.length) {
          const randomIdx =
            possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
          gridItems[randomIdx] = image;
          placedImage = true;
        }
        if (filledInRow + 1 >= 2) {
          availableRows.splice(availableRows.indexOf(rowIndex), 1);
        }
      } else {
        availableRows.splice(availableRows.indexOf(rowIndex), 1);
      }
    }
  });

  return (
    <div className="gallery-grid">
      {gridItems.map((img, index) =>
        img ? (
          <a href={img.link} key={index} className="gallery-item">
            <img src={img.src} alt={`Trail ${index + 1}`} />
          </a>
        ) : (
          <div key={index} className="gallery-item" />
        )
      )}
    </div>
  );
};

export default GalleryGrid;
