import React from "react";
import "./Label.css";
const Label = ({ labelFor, classes, ...otherProps }) => {
  return (
    <label className={`label-class ${classes}`} htmlFor={labelFor}>
      {otherProps.children}
    </label>
  );
};

export default Label;
