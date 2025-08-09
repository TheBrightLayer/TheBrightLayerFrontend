import React from "react";
import "./App.css";

export function Header() {
  return (
    <header className="header frosted">
      <div className="logo">BrightLayer</div>
      <nav>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#blog">Blog</a>
        <button className="contact-btn">Contact</button>
      </nav>
    </header>
  );
}
