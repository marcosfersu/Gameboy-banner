import React from "react";
import SwatchWrapper from "./swathWrapper";

class Canvas extends React.Component {
  render() {
    const { activeData, watchData, handlesWatchClick } = this.props;

    return (
      <div className="canvas">
        <SwatchWrapper
          activeData={activeData}
          watchData={watchData}
          handlesWatchClick={handlesWatchClick}
        ></SwatchWrapper>
      </div>
    );
  }
}

export default Canvas;
