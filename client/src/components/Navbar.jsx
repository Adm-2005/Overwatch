import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  const handleScrollToFeature = (e) => {
    e.preventDefault();
    const featureSection = document.getElementById("feature");
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); 
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md py-3 px-6 md:px-12 flex justify-between items-center z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
        <span className="text-[#133996] font-bold text-2xl">Overwatch</span>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <a href="/dashboard" onClick={handleScrollToFeature} className="text-[#133996] text-lg font-semibold hover:text-gray-600 transition">
          Dashboard
        </a>

        <a href="#feature" onClick={handleScrollToFeature} className="text-[#133996] text-lg font-semibold hover:text-gray-600 transition">
          Features
        </a>

        <a href="#contact" onClick={handleScrollToContact} className="text-[#133996] text-lg font-semibold hover:text-gray-600 transition">
          Contact
        </a>

        <Link to="/sign-in">
          <button className="px-5 py-2 border-2 border-[#133996] text-[#133996] rounded-lg text-lg font-semibold hover:bg-[#133996] hover:text-white transition">
            Login
          </button>
        </Link>

        <Link to="/sign-up">
          <button className="px-6 py-2 bg-[#133996] text-white rounded-lg text-lg font-semibold hover:bg-blue-800 transition">
            Sign Up
          </button>
        </Link>
      </div>

      <button className="md:hidden text-[#133996] text-3xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <div className={`absolute top-16 right-6 w-56 bg-white shadow-lg rounded-lg transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} md:hidden`}>
        <div className="flex flex-col items-center py-4 space-y-3">
          <a href="#feature" onClick={handleScrollToFeature} className="text-[#133996] text-lg font-semibold hover:text-gray-600 transition">
            Features
          </a>

          <a href="#contact" onClick={handleScrollToContact} className="text-[#133996] text-lg font-semibold hover:text-gray-600 transition">
            Contact Us
          </a>

          <Link to="/sign-in" className="w-5/6">
            <button className="w-full px-5 py-2 border-2 border-[#133996] text-[#133996] rounded-lg text-lg font-semibold hover:bg-[#133996] hover:text-white transition">
              Login
            </button>
          </Link>

          <Link to="/sign-up" className="w-5/6">
            <button className="w-full px-6 py-2 bg-[#133996] text-white rounded-lg text-lg font-semibold hover:bg-blue-800 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
