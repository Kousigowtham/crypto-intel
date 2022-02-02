import React from "react";
import "./Label.css";
const Label = ({ labelFor, ...otherProps }) => {
  return (
    <label className="label-class" htmlFor={labelFor}>
      {otherProps.children}
    </label>
  );
};

export default Label;
