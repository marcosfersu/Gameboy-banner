import React from "react";
import "./components.css";

const SingleSwatchCircle = ({ item, handleClick, activeId }) => {
  return (
    <div
      className={`circle center
  ${item.id === activeId ? "active-item" : ""}
  `}
      onClick={() => handleClick(item)}
    >
      <div
        style={{ backgroundColor: item.swatchColor }}
        className="circle-inner"
      ></div>
    </div>
  );
};

export default SingleSwatchCircle;
