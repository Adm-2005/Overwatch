import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../index.css"; 
import scrollSecImage1 from "../../assets/images/scrollsection_img1.png"; // Import image
import scrollSecImage2 from "../../assets/images/scrollsection_img2.png"; 

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
  const upperImageRef = useRef(null);
  const lowerImageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      upperImageRef.current,
      { y: 200 },
      {
        y: -100,
        scrollTrigger: {
          trigger: upperImageRef.current,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      lowerImageRef.current,
      { x: 200 },
      {
        y: 20,
        scrollTrigger: {
          trigger: lowerImageRef.current,
          start: "top 90%",
          end: "top 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="scroll-section">
      {/* Left-Aligned Images */}
      <div className="image-container">
        <img
          ref={lowerImageRef}
          src={scrollSecImage1}
          alt="Lower Image"
          className="lower-image"
        />
        <img
          ref={upperImageRef}
          src={scrollSecImage2}

          alt="Upper Image"
          className="upper-image"
        />
      </div>

      {/* Text Content */}
      <div className="text-content">
        <h2>AI-Powered Cyber Surveillance for Safer Digital Spaces</h2>
        <p>
          Overwatch analyzes messages in real time to detect cyberbullying and illicit activities, empowering moderators with AI-driven insights and instant alerts.
        </p>
      </div>
    </section>
  );
};

export default ScrollSection;
