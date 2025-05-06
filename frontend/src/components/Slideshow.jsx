import React, { useRef, useEffect } from "react";
import "./styling/Slideshow.css";

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

const Slideshow = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    // Select all images inside our gallery items
    const imgs = container.querySelectorAll(".gallery-item3 img");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When an image is 100% visible within the scroll container, add the "active" class.
          if (entry.intersectionRatio === 1) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      {
        root: container, // use our scrolling container as root
        threshold: 1.0, // 100% of the image must be visible
      }
    );
    imgs.forEach((img) => observer.observe(img));
    return () => {
      imgs.forEach((img) => observer.unobserve(img));
    };
  }, []);

  return (
    <>
      <h1 className="gallery-heading">Featured Trails</h1>
      <div className="horizontal-gallery-wrapper3" ref={containerRef}>
        <div className="horizontal-gallery3">
          {images.map((img, index) => (
            <a href={img.link} key={index} className="gallery-item3">
              <img src={img.src} alt={`Image ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slideshow;
