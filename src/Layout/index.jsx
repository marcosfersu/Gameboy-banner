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
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleLoading = () => {
    setIsLoading(false);
  };

  const handlesWatchClick = (item) => {
    if (activeData.id !== item.id) setActiveData(item);
  };
  const handleRotateClick = () => {
    setRotateClick(!rotateClick);
  };
  const handleOnAnimation = () => {
    setPlayAnimation(!playAnimation);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: "power3.inOut",
      duration: 0.8,
    });

    gsap.to("button", {
      color: activeData.buttonColor.text,
      fill: activeData.buttonColor.text,
      backgroundColor: activeData.buttonColor.bgInactive,
      ease: "power3.inOut",
      duration: 0.3,
    });
    gsap.to(".active", {
      backgroundColor: activeData.buttonColor.background,
      ease: "power3.inOut",
      duration: 0.3,
    });

    return () => {};
  }, [activeData, rotateClick, playAnimation]);

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
            handleOnAnimation={handleOnAnimation}
            playAnimation={playAnimation}
            rotateClick={rotateClick}
          />
        </article>
      </section>
    </div>
  );
};

export default Banner;
