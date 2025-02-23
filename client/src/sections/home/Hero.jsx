import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import "../../index.css"; 
import heroImage from "../../assets/images/herosection_img.png"; 

const HeroSection = () => {
  const [bgColor, setBgColor] = useState("#E3ECFF"); // Initial color

  useEffect(() => {
    const colors = ["#E3ECFF", "#D0E1F9", "#BFD7ED", "#A1C6EA"];
    let index = 0;
    const interval = setInterval(() => {
      setBgColor(colors[index]);
      index = (index + 1) % colors.length; 
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home"
      className="hero-section flex flex-col md:flex-row items-center px-8 md:px-16 py-16 h-auto md:h-[95vh] transition-all duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      {/* Left Side (Text Content with Padding and Animation) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 pl-4 md:pl-12"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight"
        >
          AI Guardian for Digital Safety
        </motion.h1>
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg text-gray-700 mt-4"
        >
          Overwatch detects cyber threats, prevents harassment, and secures conversations in real time with advanced AI.
        </motion.p>
        <Link
          to="/sign-up"
          className="mt-6 inline-block px-6 py-3 bg-blue-700 text-white font-semibold text-lg rounded-md shadow-md hover:bg-blue-800 transition"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Right Side (Styled Image) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img 
          src={heroImage} 
          alt="Cyber Monitoring" 
          className="max-w-[80%] md:max-w-full h-auto rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
