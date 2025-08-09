import React from "react";
import "../styles/Hero.css";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Left side - heading */}
        <div className="hero-heading">
          <h1>
            Web and Mobile App <br />
            <span className="highlight-red">Development</span> <br />
            <span className="highlight-red">Service</span>
          </h1>
        </div>

        {/* Right side - description */}
        <div className="hero-description">
          <p>
            Spark innovation and propel digital advancement with our
            outstanding Custom Web & Mobile App Development Services.
          </p>
          <button className="black-btn">GETTING STARTED</button>
        </div>
      </div>
    </section>
  );
}
