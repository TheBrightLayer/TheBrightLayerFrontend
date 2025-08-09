import React from "react";

const Services = () => {
  const serviceData = [
    {
      title: "Web Development",
      desc: "Creating modern and responsive websites.",
    },
    {
      title: "SEO Optimization",
      desc: "Improve your visibility on search engines.",
    },
    {
      title: "UI/UX Design",
      desc: "Designing user-friendly and appealing interfaces.",
    },
  ];

  return (
    <section id="services">
      <h2>Our Services</h2>
      <div className="service-list">
        {serviceData.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
