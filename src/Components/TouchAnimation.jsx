import React, { useState } from "react";
import "./components.css";

const TouchAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  setTimeout(() => {
    setIsVisible(false);
  }, 2000);

  return (
    <>
      {isVisible && (
        <div className="touch-animation center">
          <div className="touch-animation-container">
            <div className="line-animation">
              <span></span>
            </div>
            <div className="touch-img">
              <img src="touch.svg" alt="touch" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TouchAnimation;
