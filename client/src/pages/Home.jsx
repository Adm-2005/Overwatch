import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/home/Hero";
import Footer from "../components/Footer";
import ScrollingSection from "../sections/home/ScrollSection";
import FeaturesSection from "../sections/home/FeaturesSection";
import ContactSection from "../sections/home/ContactSection";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <ScrollingSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
