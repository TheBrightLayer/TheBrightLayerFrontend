import React from "react";
import "../styles/Services.css";

export function Services() {
  return (
    <section className="services-section">
      {/* Stats Row */}
      {/* <div className="stats">
        <div>
          <span className="stat-number red">14+</span>
          <span className="stat-label">Years in Business</span>
        </div>
        <div>
          <span className="stat-number red">200+</span>
          <span className="stat-label">IT Professionals</span>
        </div>
        <div>
          <span className="stat-number red">1500+</span>
          <span className="stat-label">Projects Done</span>
        </div>
      </div> */}

      {/* Heading */}
      <h2>
        Services <span className="red">We Offer</span>
      </h2>

      {/* Description */}
      <p>
        Welcome to TBoUz Technologies, where we specialize in empowering
        businesses to excel in the digital landscape. Our comprehensive services
        include custom website and{" "}
        <a href="#mobile-app">mobile app development</a>, as well as{" "}
        <a href="#software-solutions">tailored software solutions</a>. We are
        committed to delivering outstanding work that exceeds expectations, with
        a strong emphasis on quality, efficiency, and collaboration.
      </p>
      <p>
        With a strong emphasis on quality, efficiency, and collaboration, we
        guarantee to achieve and surpass your business objectives. Our goal is
        to deliver results that not only meet your needs but also add
        significant value to your business. Choose ITobuz Technologies as your
        digital partner and let us help you navigate the complexities of the
        digital landscape. Collaboratively, we can reach your business
        objectives and propel your success in the digital realm.
      </p>

      {/* Service Cards */}
      <div className="service-grid">
        <div className="service-card">Enterprise Software</div>
        <div className="service-card">SaaS Application</div>
        <div className="service-card">Enterprise Mobility Solutions</div>
        <div className="service-card">UX Research</div>
        <div className="service-card">Cloud & Infrastructure</div>
      </div>

      {/* Call to Actions */}
      <div className="cta-row">
        <div className="cta-box">
          <h3>Didn’t find what you are looking for?</h3>
          <button className="outline-btn">Explore Now</button>
        </div>
        <div className="cta-box">
          <h3>Ready to start your Project?</h3>
          <button className="filled-btn">Let’s Chat</button>
        </div>
      </div>
    </section>
  );
}
