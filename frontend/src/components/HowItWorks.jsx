import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styling/HowItWorks.css";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef(null);

  useEffect(() => {
    const steps = containerRef.current.querySelectorAll(".step");

    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            toggleActions: "play none none none", // fade in only
          },
        }
      );
    });
  }, []);

  return (
    <section className="how-it-works" ref={containerRef}>
      <div className="intro-text">
        <div className="intro-text-text">
          Trails-Hiking is a community-driven platform where hikers can explore,
          log, and share trails with real reviews and insights. Whether you're
          looking for hidden gems, tracking your hiking progress, or helping
          others find the best routes, Trails makes discovering and documenting
          outdoor adventures seamless.
        </div>
      </div>
      <hr className="custom-line" />

      <div className="how-it-container">
        <h2 className="how-it">HOW TRAILS-HIKING WORKS</h2>

        <div className="step">
          <div className="step-number">01</div>
          <div className="step-content">
            <div className="step-title">Find & Explore</div>
            <div className="subheading">Discover Trails That Suit You</div>
            <div className="step-text">
              Browse trails based on location, difficulty, and real hiker
              reviews. Whether you want an easy stroll or a challenging summit,
              Trails-Hiking helps you find the perfect route.
            </div>
          </div>
        </div>

        <div className="step">
          <div className="step-number">02</div>
          <div className="step-content">
            <div className="step-title">Add New Trails</div>
            <div className="subheading">Share Your Favorite Hikes</div>
            <div className="step-text">
              Found an awesome trail that's missing? Add it to Trails-Hiking
              with details like distance, terrain, and difficulty to help others
              explore new routes.
            </div>
          </div>
        </div>

        <div className="step">
          <div className="step-number">03</div>
          <div className="step-content">
            <div className="step-title">Review & Rate</div>
            <div className="subheading">Leave Your Mark on the Trail</div>
            <div className="step-text">
              Rate hikes, write reviews, and upload photos to share your
              experience. Your feedback helps other hikers choose the best
              trails and stay prepared.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
