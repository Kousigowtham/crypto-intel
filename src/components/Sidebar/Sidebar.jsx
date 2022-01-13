import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({ setshowSidebar }) => {
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    navigate(to);
    setshowSidebar(false);
  };
  return (
    <div className="sidebar-container">
      <i
        className="bi bi-x-lg sidebar-close"
        onClick={() => setshowSidebar(false)}
      ></i>
      <ul className="nav-list">
        <li onClick={() => navigateHandler("/")}>HOME</li>
        <li onClick={() => navigateHandler("/platforms")}>SIGNALS</li>
        <li onClick={() => navigateHandler("/signals")}>SIGNAL ANALYSIS</li>
        <li onClick={() => navigateHandler("/about")}>ABOUT US</li>
      </ul>
    </div>
  );
};

export default Sidebar;
