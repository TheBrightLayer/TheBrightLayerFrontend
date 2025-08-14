import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

import logo from "../assets/BrightLayerLogo.png";
//import bgVideo from "../assets/MD_Motion_001.mp4";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <section className="hero-section">
      {/* <video autoPlay muted loop className="hero-video">
        <source src={bgVideo} type="video/mp4" />
      </video> */}

      <div className="overlay"></div>

      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="BrightLayer Logo" className="logo" />
          </Link>
        </div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-pill ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          {/* Services with hover dropdown */}
          <div
            className="nav-link dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            Services ▾
            {servicesOpen && (
              <div className="services-dropdown">
                <div className="dropdown-column">
                  <h4>Custom Application</h4>
                  <ul>
                    <li>Web App</li>
                    <li>Mobile App</li>
                    <li>Cross Platform App</li>
                    <li>Android App</li>
                    <li>iOS App</li>
                  </ul>
                </div>
                <div className="dropdown-column">
                  <h4>Software Development</h4>
                  <ul>
                    <li>Enterprise Software</li>
                    <li>Enterprise Mobility</li>
                    <li>SaaS App</li>
                    <li>On Demand App</li>
                    <li>Blockchain App</li>
                  </ul>
                </div>
                <div className="dropdown-column">
                  <h4>Technologies</h4>
                  <ul>
                    <li>React Native</li>
                    <li>Node.js</li>
                  </ul>
                </div>
                <div className="dropdown-column">
                  <h4>Others</h4>
                  <ul>
                    <li>UX Research</li>
                    <li>Business Process Automation</li>
                    <li>Cloud & Infrastructure</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Careers hover message */}
          <div
            className="nav-link dropdown"
            onMouseEnter={() => setCareersOpen(true)}
            onMouseLeave={() => setCareersOpen(false)}
          >
            Careers
            {careersOpen && (
              <div className="simple-dropdown">No jobs as of now</div>
            )}
          </div>

          {/* Blog hover message */}
          <div
            className="nav-link dropdown"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            Blog
            {blogOpen && (
              <div className="simple-dropdown">Feature coming soon</div>
            )}
          </div>

          <Link
            to="/contact"
            className="contact-btn"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </Link>
        </nav>
      </header>
    </section>
  );
};

export default Header;
