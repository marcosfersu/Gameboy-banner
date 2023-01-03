import React from "react";
import SingleSwatchCircle from "../components/singleSwatchCircle";

const SwatchWrapper = ({ activeData, watchData, handlesWatchClick }) => {
  const handleSwatchClicked = (item) => {
    handlesWatchClick(item);
  };

  return (
    <div className="switcher">
      {watchData.map((o) => (
        <SingleSwatchCircle
          key={o.id}
          item={o}
          handleClick={handleSwatchClicked}
          activeId={activeData.id}
        />
      ))}
    </div>
  );
};

export default SwatchWrapper;
