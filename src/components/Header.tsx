import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/BrightLayerLogo.png";
import "../styles/Header.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="header"
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        background: scrolled
          ? "rgba(0,0,0,0.9)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        transition: "background 0.3s ease",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="nav-container" style={{ padding: "15px 10%" }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="navbar-logo"
        >
          <img src={logo} alt="BrightLayer" style={{ height: "40px" }} />
        </motion.div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            display: "none",
          }}
        >
          ☰
        </div>

        {/* Menu Links */}
        <motion.nav
          className={`nav-links ${menuOpen ? "active" : ""}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {["About Us", "Services ▾", "Industry ▾", "Contact", "Blog", "Careers"].map(
            (item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                style={{
                  position: "relative",
                  padding: "0 10px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  color: "#fff",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffcc00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
              >
                {item}
              </a>
            )
          )}
        </motion.nav>

        {/* Right-Side Buttons */}
        <motion.div
          className={`nav-actions ${menuOpen ? "active" : ""}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            style={{
              background: "transparent",
              border: "2px solid #ffcc00",
              color: "#ffcc00",
              padding: "8px 18px",
              borderRadius: "6px",
              fontWeight: 600,
              marginRight: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffcc00";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#ffcc00";
            }}
          >
            Our Process
          </button>
          <button
            style={{
              background: "linear-gradient(135deg, #ffcc00, #ff9900)",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #ffd633, #ffad33)";
            }}
            onClick={() => (window.location.href = "/contact")}
          >
            Let’s Talk
          </button>
        </motion.div>
      </div>
    </header>
  );
}
