import React from "react";
import "../styles/Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Top Banner */}
      <div className="footer-top">
        <h2>Build something amazing with us</h2>
        <button className="expert-btn">TALK TO OUR EXPERT</button>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-content">
          {/* Logo + Description */}
          <div className="footer-col">
            <h4>TheBrightLayer</h4>
            <p>
              High level experience in web design and development knowledge,
              producing quality work.
            </p>
          </div>

          {/* Address Columns */}
          <div className="footer-col">
            <h4>Kolkata</h4>
            <p>
              STP Building, DN 24 Block,
              <br />
              Salt Lake, Sec-V,
              <br />
              Kolkata-700091
            </p>
          </div>

          <div className="footer-col">
            <h4>Jamshedpur</h4>
            <p>
              82-21 150th Avenue,
              <br />
              DEL 117 Springfield Gardens
              <br />
            </p>
          </div>

          {/* Social Media */}
          <div className="footer-col social-col">
            <h4>Follow us on social media</h4>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Awards Row */}
      </div>
    </footer>
  );
};

export default Footer;
