import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <>
      <nav className="navbar py-3 sticky-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand flex-grow-1">
            CryptoIntelligence
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              <li
                className={`nav-item ms-2 ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ms-2 ${
                  location.pathname === "/signals" ? "active" : ""
                }`}
              >
                <Link to="/signals" className="nav-link" aria-current="page">
                  Signals
                </Link>
              </li>
              <li
                className={`nav-item ms-2 ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link to="/about" className="nav-link" aria-current="page">
                  About
                </Link>
              </li>
              <li
                className={`nav-item ms-2 ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link to="/contact" className="nav-link" aria-current="page">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
