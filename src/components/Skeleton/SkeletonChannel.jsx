import React from "react";
import SekeletonElement from "./SekeletonElement";
import Skeletonshimmer from "./Skeletonshimmer";

const SkeletonChannel = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-channel">
        <SekeletonElement type="title" />
        <SekeletonElement type="text" />
      </div>
      <Skeletonshimmer />
    </div>
  );
};

export default SkeletonChannel;
