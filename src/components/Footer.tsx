import React from "react";
import "../components/App.css";

export function Footer() {
  return (
    <footer className="bl-footer">
      <div className="bl-container bl-footer-grid">
        <div>
          <div className="bl-logo bl-footer-logo">BrightLayer</div>
          <p className="bl-footer-tag">We build digital products that people love.</p>
        </div>

        <div>
          <h4 className="bl-footer-heading">Services</h4>
          <ul className="bl-footer-links">
            <li><a href="#services">Web Development</a></li>
            <li><a href="#services">Mobile Apps</a></li>
            <li><a href="#services">UI/UX Design</a></li>
            <li><a href="#services">Cloud Solutions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bl-footer-heading">Company</h4>
          <ul className="bl-footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bl-footer-heading">Contact</h4>
          <p className="bl-footer-contact">Email: hi@brightlayer.com</p>
          <p className="bl-footer-contact">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="bl-footer-bottom">
        <small>© {new Date().getFullYear()} BrightLayer — All rights reserved.</small>
      </div>
    </footer>
  );
}
export default Footer;
