import React from "react";
import ReactDOM from "react-dom";
import "./createPortal.css";

const CreatePortal = (props) => {
  return ReactDOM.createPortal(
    <div className="portal-container">{props.children}</div>,
    document.getElementById("portal-root")
  );
};

export default CreatePortal;
