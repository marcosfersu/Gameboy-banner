import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import data from "../Data";
import Canvas from "./canvas";
import Content from "./content";
import "./layout.css";
import Loading from "./Loading";

const Banner = () => {
  const banner = useRef();

  const [activeData, setActiveData] = useState(data[0]);
  const [rotateClick, setRotateClick] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  const handlesWatchClick = (item) => {
    if (activeData.id !== item.id) setActiveData(item);
  };
  const handleRotateClick = () => {
    setRotateClick(!rotateClick);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: "power3.inOut",
      duration: 0.8,
    });

    return () => {};
  }, [activeData]);

  return (
    <div ref={banner} className="banner center">
      {isLoading && <Loading />}
      <section className="banner-content">
        <article className="half-banner center">
          <Content activeData={activeData} />
        </article>
        <article className="half-banner">
          <Canvas
            activeData={activeData}
            watchData={data}
            handlesWatchClick={handlesWatchClick}
            handleLoading={handleLoading}
            handleRotateClick={handleRotateClick}
            rotateClick={rotateClick}
          />
        </article>
      </section>
    </div>
  );
};

export default Banner;
