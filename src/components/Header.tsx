import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/BrightLayerLogo.png";
import "../styles/Header.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="nav-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="BrightLayer" />
          </Link>
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
          <Link to="/about">About Us</Link>
          <div className="dropdown">
            <Link to="/services">Services ▾</Link>
          </div>
          <div className="dropdown">
            <Link to="/industry">Industry ▾</Link>
          </div>
          <Link to="/contact">Contact</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/careers">Careers</Link>
        </nav>

        {/* Right-side buttons */}
        <div className={`nav-actions ${menuOpen ? "active" : ""}`}>
          <Link to="/process">
            <button className="outline-btn">Our Process</button>
          </Link>
          <Link to="/contact">
            <button className="filled-btn">Let’s Talk</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
