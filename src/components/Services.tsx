import React from "react";
import "./App.css";

export function Services() {
  const services = [
    { title: "Web Development", desc: "Custom, scalable websites for your business." },
    { title: "Mobile Apps", desc: "iOS and Android apps built for performance." },
    { title: "UI/UX Design", desc: "Beautiful and intuitive digital experiences." },
    { title: "Cloud Solutions", desc: "Secure, fast, and reliable cloud deployments." }
  ];

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-list">
        {services.map((s, index) => (
          <div key={index} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
