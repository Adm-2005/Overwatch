import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left - Company Info */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-white">Overwatch</h2>
          <p className="text-gray-400 mt-2">
          Overwatch is your trusted AI-powered cyber-monitoring solution, ensuring safety on digital platforms.
          </p>
        </div>

        {/* Right - Company & Follow Us in Same Row */}
        <div className="w-full md:w-2/3 flex justify-end items-start md:items-center space-x-16 mt-6 md:mt-0">
          
          {/* Company Section with Custom Padding */}
          <div className="company-section">
            <h3 className="text-lg font-semibold">Overwatch</h3>
            <div className="w-12 border-t-2 border-gray-500 mt-1 mb-3"></div>
            <ul className="space-y-1 text-center md:text-left">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("feature")} 
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us Section (Aligned with Company) */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="w-12 border-t-2 border-gray-500 mt-1 mb-3"></div>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-blue-500 transition">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-blue-500 transition">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-blue-500 transition">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full text-white hover:bg-blue-500 transition">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Overwatch. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
