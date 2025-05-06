import React from "react";
import "./styling/Marquee.css";

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
export default function Marquee() {
  const repeatedSayings = [...trailSayings, ...trailSayings];

  return (
    <div className="marquee-banner1">
      <div className="marquee-track1">
        {repeatedSayings.map((saying, index) => (
          <p key={index} className="marquee-text1">
            {saying}
          </p>
        ))}
      </div>
    </div>
  );
}
