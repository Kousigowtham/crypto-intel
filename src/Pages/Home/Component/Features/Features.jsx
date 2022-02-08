import React from "react";
import "./Features.css";
import rightIcon from "../../../../Assets/rightIcon.png";
const Features = ({
  imageList = [],
  featuresList = [],
  header,
  description,
  columnReverse,
}) => {
  return (
    <div className={`features-container ${columnReverse && "reverse"}`}>
      <div className="features-img-container">
        {imageList.map((image, index) => {
          return (
            <>
              <img
                className={image.className}
                src={image.src}
                alt={image.name}
                id={image.name}
              />
            </>
          );
        })}
      </div>
      <div className="features-content-container">
        <h3>{header}</h3>
        <p>{description}</p>
        <div className="mt-5">
          {featuresList.map((feature, index) => {
            return (
              <div className="d-flex mb-2">
                <img
                  src={rightIcon}
                  height="30px"
                  width="30px"
                  alt="rightIcon"
                />
                <p className="ms-4">{feature}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
