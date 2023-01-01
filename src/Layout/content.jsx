import gsap from "gsap";
import React, { useEffect } from "react";

const Content = ({ activeData }) => {
  useEffect(() => {
    gsap.from("span", {
      y: 200,
      ease: "power4.out",
      duration: 0.5,
      stagger: {
        amount: 0.1,
      },
    });

    gsap.to("button", {
      color: activeData.buttonColor.text,
      backgroundColor: activeData.buttonColor.background,
      ease: "power3.inOut",
      duration: 1,
    });
    gsap.to("span", {
      color: activeData.headingColor,
      ease: "power3.inOut",
      duration: 0.8,
    });

    return () => {};
  }, [activeData]);

  return (
    <div className="content">
      <div className="text-content">
        <h1 className="heading ">
          <span className="text">{activeData.heading}</span>
        </h1>
        <h3 className="sub-heading">
          <span className="text">{activeData.subHeading}</span>
        </h3>
        <p className="description">
          <span className="text">{activeData.text}</span>
        </p>
      </div>
      <div>
        <button>shop now</button>
      </div>
    </div>
  );
};

export default Content;
