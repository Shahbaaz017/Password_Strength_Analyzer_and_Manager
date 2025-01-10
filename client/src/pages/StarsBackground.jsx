import React from "react";
import "./StarsBackground.scss";

const StarsBackground = () => {
  return (
    <div className="stars">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="star"></div>
      ))}
    </div>
  );
};

export default StarsBackground;
