import React from "react";
import "../../index.css";

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-xs text-center">
      <div className="w-full flex justify-center items-center">
        <img src={image} alt={title} className="w-full h-auto object-contain" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
