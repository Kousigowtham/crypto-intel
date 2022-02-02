import React from "react";
import { useState, useEffect } from "react";
import "./ZoomIn.css";

const ZoomIn = ({ show, classes, children, ...otherProps }) => {
  const [render, setRender] = useState(show);

  const AnimationEndHandler = () => {
    if (!show) setRender(false);
  };
  useEffect(() => {
    if (show) setRender(show);
  }, [show]);

  return (
    <>
      {render && (
        <div
          className={`${classes} ${show ? "ZoomIn" : "ZoomOut"}`}
          onAnimationEnd={AnimationEndHandler}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ZoomIn;
