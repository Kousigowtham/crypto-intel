import React from "react";

const Input = ({ label, classes, ...OtherProps }) => {
  return (
    <div className={classes}>
      <label>{label}</label>
      <input {...OtherProps} />
    </div>
  );
};

export default Input;
