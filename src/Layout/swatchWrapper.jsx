import React from "react";
import { SingleSwatchWrapper } from "../components";

const SwatchWrapper = ({ activeData, watchData, handlesWatchClick }) => {
  const handleSwatchClicked = (item) => {
    handlesWatchClick(item);
  };

  return (
    <div className="switcher">
      {watchData.map((o) => (
        <SingleSwatchWrapper
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
