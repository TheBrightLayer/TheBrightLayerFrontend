import React from "react";
import "./App.css";

export function Header() {
  return (
    <header className="header">
      <div className="logo">BrightLayer</div>
      <nav>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
