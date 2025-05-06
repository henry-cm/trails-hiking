import React, { useEffect, useRef } from "react";
import "../components/styling/About.css";
import Marquee from "../components/Marquee";
import "../components/styling/Marquee.css";
import bannerImage from "../assets/trail_02.avif";
import Banner from "../components/Banner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = containerRef.current.querySelectorAll(".about-section");
    const intro = containerRef.current.querySelector(".intro");

    gsap.from(intro, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: intro,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <Banner image={bannerImage} title="ABOUT" altText="About Banner" />
      <Marquee />

      <section className="about-content">
        <p className="intro">
          Trails-Hiking is a community-driven platform built for adventurers who
          love to explore the outdoors and share their favorite trails with
          like-minded hikers. Whether you're searching for hidden gems, planning
          a challenging summit, or simply seeking a peaceful nature walk,
          Trails-Hiking is designed to make trail discovery accessible,
          reliable, and inspiring. <br></br>
          <br />
          We believe that every trail tells a story—of breathtaking views, tough
          climbs, and unforgettable experiences. That's why we empower our
          community with authentic user reviews, detailed trail information, and
          real ratings, helping hikers make informed decisions about their
          adventures. Our mission is simple: to connect outdoor enthusiasts,
          make trail exploration easier, and ensure that every hiking journey,
          no matter how big or small, is a memorable one.
        </p>

        <div className="about-section">
          <h2>Our Mission</h2>
          <h4>Bringing Hikers Together, One Trail at a Time.</h4>
          <p>
            At Trails-Hiking, we believe that the most meaningful adventures
            begin with the right information and the right community. Our
            mission is to build a reliable, community-first platform where
            hikers from around the world can come together to share experiences,
            offer advice, and inspire others to get outdoors.
            <br></br>
            <br />
            We strive to create a space where both seasoned hikers and beginners
            feel empowered to discover new trails, connect with fellow
            adventurers, and share their journeys. Whether it's uncovering a
            little-known local path or tackling a globally recognized hiking
            route, we aim to equip our community with everything they need to
            make the most of their experience—from route difficulty and terrain
            insights to trail safety tips and nearby amenities.
          </p>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <h4>Find. Share. Explore.</h4>
          <p>
            Trails-Hiking is built around the power of community contributions.
            Every hiker has a story to tell, and our platform is designed to
            capture and share these experiences, making it easier for everyone
            to discover and explore the world of hiking. Here's how it works:
          </p>
          <ul>
            <li>
              Find Trails: Use our intuitive search and filtering system to
              discover trails that match your preferences. Search by location,
              difficulty level, length, and even by community reviews to find
              the perfect route. Whether you're after a quick morning hike or an
              all-day expedition, we've got trails that suit every type of
              adventure.
            </li>
            <li>
              Share New Trails: Have you uncovered an incredible path that
              others need to know about? Contribute to our growing database by
              adding new trails, sharing details like terrain, trailhead access,
              estimated duration, and unique features. Your contributions help
              expand the community’s knowledge and inspire more people to
              explore.
            </li>
            <li>
              Rate & Review: Share your experience after completing a trail.
              Write reviews, rate the difficulty, and offer tips for future
              hikers. Your insights help others prepare better and enjoy a
              safer, more enjoyable hiking experience. The more feedback shared,
              the stronger and more helpful the community becomes.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Trails-Hiking?</h2>
          <h4>A Platform Built by Hikers, for Hikers.</h4>
          <p>
            Trails-Hiking isn’t just a directory of trails—it's a living,
            evolving community shaped by real outdoor enthusiasts. We value
            authenticity, inclusivity, and the collective knowledge of our
            users. Our platform is designed with hikers in mind, focusing on
            what truly matters:
          </p>
          <ul>
            <li>
              Authentic Reviews from Real Hikers: Every review is shared by real
              individuals who’ve walked the trails, offering genuine insights
              and recommendations. This helps others make informed decisions
              based on firsthand experiences.
            </li>
            <li>
              A Growing Collection of User-Submitted Trails: Our database grows
              with every contribution. Each new trail added by a user enhances
              the diversity and richness of hiking experiences for the entire
              community.
            </li>
            <li>
              Community Feedback that Drives Improvements: We listen to our
              users. Continuous improvements based on community feedback ensure
              that Trails-Hiking remains a reliable, valuable resource for all
              adventurers. Whether it's suggesting better map features or adding
              accessibility insights, your voice shapes the future of the
              platform.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Join the Community</h2>
          <h4>Be Part of the Adventure.</h4>
          <p>
            Trails-Hiking thrives on the passion and contributions of our
            community. Every time a hiker adds a new trail, writes a review, or
            shares valuable feedback, the platform grows stronger and more
            helpful. It’s about more than just trails—it’s about connecting with
            others, inspiring exploration, and encouraging outdoor lifestyles.
            <br></br>
            <br />
            By joining the Trails-Hiking community, you become part of something
            bigger. You help shape a space where every hiker, whether beginner
            or pro, can find the information they need, feel inspired, and stay
            safe on their adventures. Together, we build a library of
            experiences that benefits everyone.
          </p>
          <ul>
            <li>Share your unique hiking stories and photos.</li>
            <li>Add new trails that deserve to be discovered.</li>
            <li>Write reviews to guide future adventurers.</li>
            <li>Give feedback to help shape the platform's growth.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Continuous Updates & Improvements</h2>
          <h4>Building a Better Trails-Hiking, Together.</h4>
          <p>
            Trails-Hiking is a dynamic platform that's constantly evolving to
            meet the needs of our community. We’re committed to delivering a
            seamless, reliable experience by regularly rolling out new features,
            enhancing existing tools, and addressing bugs. Our goal is to ensure
            that every hike is supported by the best possible digital companion.
          </p>
          <ul>
            <li>
              New Features: We're always looking for ways to make Trails-Hiking
              better. Whether it's introducing advanced trail filters, improving
              user profiles, or enhancing map functionalities, our updates are
              driven by your feedback and needs.
            </li>
            <li>
              Bug Fixes & Enhancements: We know how frustrating bugs can be. Our
              team is dedicated to identifying and resolving issues quickly to
              ensure a smooth experience for every user.
            </li>
            <li>
              Community-Driven Growth: Your input matters. We encourage feedback
              and suggestions to help us shape the future of Trails-Hiking.
              Every update reflects the voices of our hikers, ensuring the
              platform grows alongside its community.
            </li>
            <li>
              Future Plans: From personalized trail recommendations to improved
              route tracking, we're continuously exploring new ways to enhance
              your hiking experience. Stay tuned for upcoming updates that will
              take your adventures to the next level.
            </li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Additional Information</h2>

          <p>
            ⚠️ Some trail images are used for demonstration purposes only and
            will be replaced with user-submitted or licensed content as the
            platform grows.
          </p>
        </div>
      </section>
    </div>
  );
}
