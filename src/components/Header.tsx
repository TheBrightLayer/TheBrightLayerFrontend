import React from "react";
import "../styles/Header.css";

export function Header() {
  return (
    <header className="header">
      {/* Top bar */}
      <div className="top-bar">
        {/* <span className="dot"></span>
        <span>Celebrating 15 Years of Success, Grandeur & Togetherness</span> */}
      </div>

      {/* Main navigation */}
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <img src="../assets/BrightLayerLogo" alt="BrightLayer" />
        </div>

        {/* Menu links */}
        <nav className="nav-links">
          <a href="#about">About Us</a>
          <div className="dropdown">
            <a href="#services">Services ▾</a>
            {/* Optional dropdown menu */}
          </div>
          <div className="dropdown">
            <a href="#industry">Industry ▾</a>
          </div>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
          <a href="#careers">Careers</a>
        </nav>

        {/* Right-side buttons */}
        <div className="nav-actions">
          <button className="outline-btn">Our Process</button>
          <button className="filled-btn">Let’s Talk</button>
        </div>
      </div>
    </header>
  );
}
