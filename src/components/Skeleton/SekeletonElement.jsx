import React from "react";
import "./Skeleton.css";

const SekeletonElement = ({ type }) => {
  const classes = `skeleton-${type}`;
  return <div className={classes}></div>;
};

export default SekeletonElement;
