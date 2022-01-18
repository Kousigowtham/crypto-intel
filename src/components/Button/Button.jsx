import React from "react";
import "./Button.css";

const Button = ({ classes, Content, ...otherProps }) => {
  return (
    <button className={`button ${classes}`} {...otherProps}>
      {Content}
    </button>
  );
};

export default Button;
