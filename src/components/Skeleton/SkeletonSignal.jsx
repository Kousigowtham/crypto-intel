import React from "react";
import SekeletonElement from "./SekeletonElement";
import Skeletonshimmer from "./Skeletonshimmer";

const SkeletonSignal = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-signal">
        <SekeletonElement type="title" />
        <SekeletonElement type="text" />
        <SekeletonElement type="text" />
      </div>
      <Skeletonshimmer />
    </div>
  );
};

export default SkeletonSignal;
