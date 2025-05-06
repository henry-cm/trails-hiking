import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrailCard from "./TrailCard";
import "./styling/TrailList.css";

gsap.registerPlugin(ScrollTrigger);

const TrailList = ({ trailgrounds }) => {
  const listRef = useRef(null);

  // useEffect(() => {
  //   const cards = listRef.current.querySelectorAll(".trail-card-wrapper");

  //   cards.forEach((card) => {
  //     gsap.fromTo(
  //       card,
  //       { opacity: 0, y: 30 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top 95%",
  //           toggleActions: "play none none none",
  //         },
  //       }
  //     );
  //   });
  // }, []);

  return (
    <div className="trail-list-container" ref={listRef}>
      {trailgrounds.map((trail) => (
        <div key={trail._id} className="trail-card-wrapper">
          <TrailCard trail={trail} />
          <hr className="trail-divider" />
        </div>
      ))}
    </div>
  );
};

export default TrailList;
