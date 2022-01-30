import React, { useState, useEffect } from "react";
import "./FadeIn.css";
const FadeIn = ({
  show,
  classes,
  FadeOutComponent,
  children,
  ...otherProps
}) => {
  const [render, setRender] = useState(show);

  const AnimationEndHandler = () => {
    if (!show) setRender(false);
  };

  useEffect(() => {
    if (show) setRender(show);
  }, [show]);

  return (
    <>
      {render ? (
        <div
          className={`${classes} ${show ? "FadeIn" : "FadeOut"}`}
          onAnimationEnd={AnimationEndHandler}
        >
          {children}
        </div>
      ) : (
        FadeOutComponent && <FadeOutComponent />
      )}
    </>
  );
};

export default FadeIn;
