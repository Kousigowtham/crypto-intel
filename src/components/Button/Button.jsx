import React from "react";
import "./Button.css";

const Button = ({ classes, Content, ...otherProps }) => {
  return (
    <btn className={`button ${classes}`} {...otherProps}>
      {Content}
    </btn>
  );
};

export default Button;
