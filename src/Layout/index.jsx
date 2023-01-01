import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import data from "../Data";
import Canvas from "./canvas";
import Content from "./content";
import "./layout.css";

const Banner = () => {
  const banner = useRef();

  const [activeData, setActiveData] = useState(data[0]);

  const handlesWatchClick = (item) => {
    if (activeData.id !== item.id) setActiveData(item);
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
      <section className="banner-content">
        <article className="half-banner center">
          <Content activeData={activeData} />
        </article>
        <article className="half-banner">
          <Canvas
            activeData={activeData}
            watchData={data}
            handlesWatchClick={handlesWatchClick}
          />
        </article>
      </section>
    </div>
  );
};

export default Banner;
