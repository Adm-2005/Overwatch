import React from "react";
import { motion } from "framer-motion";

import feature1 from "../../assets/images/feature1.png";
import integration from "../../assets/images/feature2.png";
import privacy from "../../assets/images/feature3.png";
import profiling from "../../assets/images/feature4.png";
import dashboard from "../../assets/images/feature5.png"
import alert from "../../assets/images/feature6.png";

const features = [
  {
    image: feature1,
    title: "Real-time Message Analysis",
    description: "Detects harmful messages in real time using AI-powered NLP, ensuring safer chats."
   },
  {
    image: integration,
    title: "Cross-Platform Integration",
    description: "Seamlessly integrates with Discord, Telegram, and Facebook for unified security." 
  },
  {
    image: privacy,
    title: "Federated Learning",
    description: "Enhances user privacy by processing messages locally, reducing risks associated with data exposure.",
  },
  {
    image: profiling,
    title: "User Behavior Profiling",
    description: "Monitors and identifies repeated offenders, ensuring proactive moderation and enforcement.",
  },
  {
    image: dashboard,
    title: "Moderator Dashboard",
    description: "Offers insights, flagged message alerts, and comprehensive action tools for moderators.",
  },
  {
    image: alert,
    title: "Alert System",
    description: "Instantly notifies moderators of high-risk messages, enabling swift intervention.",
  },
];

const FeatureSection = () => {
    return (
      <div id = "feature" className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-blue-100">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/3 text-left space-y-4"
        >
          <motion.h2 className="text-4xl font-bold text-blue-900">
            Overwatch Features
          </motion.h2>
          <motion.p className="text-lg text-blue-800">
            Our AI-powered system ensures safety across messaging platforms by detecting and preventing cyber threats.
          </motion.p>
        </motion.div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-0 md:w-2/3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-0 bg-white shadow-lg rounded-xl transition-all duration-300 flex flex-col text-left hover:bg-blue-50 hover:text-blue-900 overflow-hidden w-full h-[320px]"
            >
              {/* Image Section - Covers Half the Card */}
              <div className="w-full h-1/2">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Text Content */}
              <div className="p-4 flex flex-col w-full h-1/2">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
                <p className="text-blue-700 hover:text-blue-900 text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FeatureSection;
  