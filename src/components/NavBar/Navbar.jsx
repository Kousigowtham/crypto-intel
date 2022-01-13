import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setshow] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        if (!entities[0].isIntersecting && navRef && navRef.current) {
          navRef.current.classList.add("nav-scroll");
          console.log("inside");
        } else if (navRef && navRef.current) {
          navRef.current.classList.remove("nav-scroll");
          console.log("outside");
        }
      },
      {
        rootMargin: "-300px 0px 0px 0px",
      }
    );
    const handleNavObserver = () => {
      if (document.getElementById("home-container-section-1") !== null)
        window.onload = observer.observe(
          document.getElementById("home-container-section-1")
        );
    };
    const navreference = navRef.current;
    window.addEventListener("scroll", handleNavObserver);
    return () => {
      window.removeEventListener("scroll", handleNavObserver);
      console.log(navreference);
      if (navreference) navreference.classList.remove("nav-scroll");
    };
  }, []);

  console.log(navRef);
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
  const activeTab = window.location.pathname;

  return (
    <>
      <header id="navBar-header" ref={navRef}>
        <h2 className="logo">CRYPTO-INTEL</h2>
        <nav className="nav-container">
          <ul className="nav-items">
            <li
              className={`nav-item push-right ${activeTab === "/" && "active"}`}
              onClick={() => navigate("/")}
            >
              HOME
            </li>
            <li
              className={`nav-item ${activeTab === "/signals" && "active"}`}
              onClick={() => navigate("/platforms")}
            >
              SIGNALS
            </li>
            <li
              className={`nav-item ${activeTab === "/platforms" && "active"}`}
              onClick={() => navigate("/signals")}
            >
              SIGNAL ANALYSIS
            </li>
            <li
              className={`nav-item ${activeTab === "/about" && "active"}`}
              onClick={() => navigate("/about")}
            >
              ABOUT US
            </li>
            <li className="push-right btn-grp">
              {activeTab !== "/login" && (
                <Button
                  classes="login-button"
                  Content="Login"
                  onClick={() => navigate("/login")}
                />
              )}

              {activeTab !== "/register" && (
                <Button
                  Content="SIGN UP"
                  onClick={() => navigate("/register")}
                />
              )}
            </li>
          </ul>
        </nav>
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
