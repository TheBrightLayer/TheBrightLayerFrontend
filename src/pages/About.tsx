import React from "react";
import "../styles/About.css";
import logo from "../assets/BrightLayerLogo.png";
import logo1 from "../assets/image-530.webp";
import logo2 from "../assets/image-532.webp";
import logo3 from "../assets/visionaries.webp";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="about-section">
      {/* Logo in top-left */}
      <div className="hero-logo">
        <Link to="/">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>
      {/* Who Are We */}
      <div className="about-row">
        <div className="about-title">
          <h1>
            Who are <span className="highlight">We.</span>
          </h1>
        </div>
        <div className="about-text">
          <p>
            Welcome to BrightLayer, where we excel in providing software
            development solutions that yield measurable results. With a
            reputation for reliability, we prioritize delivering practical and
            efficient software solutions customized to meet your specific
            requirements. Our team of highly skilled professionals is dedicated
            to remaining at the forefront of industry trends, leveraging the
            latest technologies to guarantee the success of your project.
            Whether you require mobile apps, web development, or bespoke
            software, you can trust us to deliver with expertise and precision.
          </p>
        </div>
      </div>

      {/* Our Style */}
      <div className="about-row">
        <div className="about-title">
          <h1>
            Our <span className="highlight">Style</span>
          </h1>
        </div>
        <div className="about-text">
          <p>
            At BrightLayer, our approach is all about blending innovation with
            practicality. We take pride in crafting software solutions that go
            above and beyond what’s expected in the industry. With a keen eye
            for design and a commitment to user experience, we craft elegant and
            intuitive solutions tailored to your unique needs. From sleek mobile
            apps to dynamic web platforms, our style is characterized by
            creativity, precision, and a relentless drive for excellence.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="about-cards">
        <div className="about-card">
          <img src={logo3}></img>
          <div className="card-overlay">
            <h3>Visionaries in Technology</h3>
          </div>
        </div>

        <div className="about-card">
          <img src={logo2}></img>
          <div className="card-overlay">
            <h3>Industry Pioneers</h3>
          </div>
        </div>

        <div className="about-card">
          <img src={logo1}></img>
          <div className="card-overlay">
            <h3>Community Engagement</h3>
          </div>
        </div>
      </div>

      {/* Our Expertise */}
      <div className="expertise-section">
        <h2>
          Our <span className="highlight-red">Expertise</span>
        </h2>
        <div className="expertise-grid">
          <div className="expertise-item">
            <h3>Custom App Development</h3>
            <p>
              Crafting personalized apps to meet specific needs. Our innovative
              approach guarantees seamless functionality and outstanding user
              experiences through inventive solutions.
            </p>
          </div>

          <div className="expertise-item">
            <h3>Software Development</h3>
            <p>
              Bringing visions to life with dependable, efficient, scalable
              solutions. Our expertise ensures software excellence, surpassing
              expectations throughout development stages.
            </p>
          </div>

          <div className="expertise-item">
            <h3>Web Development</h3>
            <p>
              Captivating online experiences are our specialty. We create
              engaging websites and applications with the latest web
              technologies, ensuring responsiveness and user-friendliness.
            </p>
          </div>

          <div className="expertise-item">
            <h3>UX Research</h3>
            <p>
              Enhancing user satisfaction is our goal. We gather deep insights
              and conduct meticulous analysis to ensure intuitive and enjoyable
              interactions with your product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
