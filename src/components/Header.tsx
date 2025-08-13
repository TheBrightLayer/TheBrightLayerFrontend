import React, { useState } from "react";
import logo from "../assets/BrightLayerLogo.png"; // Import the logo

import "../styles/Header.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      {/* Top bar */}
      <div className="top-bar">
        {/* Optional announcement */}
        {/* <span className="dot"></span>
        <span>Celebrating 15 Years of Success, Grandeur & Togetherness</span> */}
      </div>

      {/* Main navigation */}
      <div className="nav-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="BrightLayer" />
        </div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          ☰
        </div>

        {/* Menu links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#about">About Us</a>
          <div className="dropdown">
            <a href="#services">Services ▾</a>
          </div>
          <div className="dropdown">
            <a href="#industry">Industry ▾</a>
          </div>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
          <a href="#careers">Careers</a>
        </nav>

        {/* Right-side buttons */}
        <div className={`nav-actions ${menuOpen ? "active" : ""}`}>
          <button className="outline-btn">Our Process</button>
          <button
            className="filled-btn"
            onClick={() => (window.location.href = "/contact")}
          >
            Let’s Talk
          </button>
        </div>
      </div>
    </header>
  );
}
