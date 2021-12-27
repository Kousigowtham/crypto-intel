import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ style }) => {
  const location = useLocation();
  const [show, setshow] = useState(false);

  const observer = new IntersectionObserver(
    (entities) => {
      if (!entities[0].isIntersecting) {
        document.getElementById("navBar-header").classList.add("nav-scroll");
        console.log("inside");
      } else {
        document.getElementById("navBar-header").classList.remove("nav-scroll");
        console.log("outside");
      }
    },
    {
      rootMargin: "-300px 0px 0px 0px",
    }
  );
  const handleNavObserver = () => {
    console.log(document.getElementById("home-container-section-1"));
    if (document.getElementById("home-container-section-1") !== null)
      window.onload = observer.observe(
        document.getElementById("home-container-section-1")
      );
  };
  useEffect(() => {
    window.addEventListener("scroll", handleNavObserver);
    return () => {
      window.removeEventListener("scroll", handleNavObserver);
    };
  });

  const clickHanlder = () => {
    if (!show) {
      document.getElementsByClassName("menu-item")[0].classList.add("open");
      document.body.style.overflow = "hidden";
      setshow((prev) => !prev);
    } else {
      document.getElementsByClassName("menu-item")[0].classList.remove("open");
      document.body.style.overflow = "auto";
      setshow((prev) => !prev);
    }
  };

  return (
    <>
      <header style={style} id="navBar-header">
        <h1 className="logo">CRYPTO-INTEL</h1>
        <div className="nav-items">
          <li>
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              HOME
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/signals" ? "active" : ""}
              to="/signals"
            >
              SIGNALS
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/platforms" ? "active" : ""}
              to="/platforms"
            >
              SIGNAL ANALYSIS
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/about" ? "active" : ""}
              to="/about"
            >
              ABOUT US
            </Link>
            <div />
          </li>

          <div>
            <button>SIGN UP</button>
          </div>
        </div>
        <div className="menu-item" onClick={clickHanlder}>
          <div className="menu-item-burger"></div>
        </div>
      </header>
      {show && (
        <div className="menu-item-nav-list">
          <li>
            <Link
              className={location.pathname === "/" ? "active" : ""}
              to="/"
              onClick={clickHanlder}
            >
              HOME
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/signals" ? "active" : ""}
              onClick={clickHanlder}
              to="/signals"
            >
              SIGNALS
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/platforms" ? "active" : ""}
              onClick={clickHanlder}
              to="/platforms"
            >
              SIGNAL ANALYSIS
            </Link>
            <div />
          </li>

          <li>
            <Link
              className={location.pathname === "/about" ? "active" : ""}
              onClick={clickHanlder}
              to="/about"
            >
              ABOUT US
            </Link>
            <div />
          </li>
        </div>
      )}
    </>
  );
};

export default Navbar;
