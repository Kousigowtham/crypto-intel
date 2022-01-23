import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({ showSidebar, setshowSidebar }) => {
  const [render, setRender] = useState(showSidebar);
  const navigate = useNavigate();

  const navigateHandler = (to) => {
    navigate(to);
    setshowSidebar(false);
  };

  const AnimationEndHandler = () => {
    if (!showSidebar) setRender(false);
  };

  console.log(showSidebar);
  useEffect(() => {
    if (showSidebar) setRender(showSidebar);
  }, [showSidebar]);
  return (
    <>
      {render && (
        <div
          className={`sidebar-container ${showSidebar ? "FadeIn" : "FadeOut"}`}
          onAnimationEnd={AnimationEndHandler}
        >
          <i
            className="bi bi-x-lg sidebar-close"
            onClick={() => setshowSidebar(false)}
          ></i>
          <ul className="nav-list">
            <li
              onClick={() => navigateHandler("/")}
              className={window.location.pathname === "/" && "active"}
            >
              <i class="bi bi-house-door-fill"></i>HOME
            </li>
            <li
              onClick={() => navigateHandler("/platforms")}
              className={window.location.pathname === "/platforms" && "active"}
            >
              <i class="bi bi-activity"></i>SIGNALS
            </li>
            <li
              onClick={() => navigateHandler("/signals")}
              className={window.location.pathname === "/signals" && "active"}
            >
              <i class="bi bi-clipboard-data"></i>SIGNAL ANALYSIS
            </li>
            <li
              onClick={() => navigateHandler("/about")}
              className={window.location.pathname === "/about" && "active"}
            >
              <i class="bi bi-person-fill"></i>ABOUT US
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
