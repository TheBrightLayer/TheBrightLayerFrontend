import React from "react";
import "./App.css";

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <p>&copy; {new Date().getFullYear()} BrightLayer. All rights reserved.</p>
    </footer>
  );
}
