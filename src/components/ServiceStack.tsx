import React from "react";
import logo1 from "../assets/healthcare-img.png";
import logo2 from "../assets/Rectangle-15.png";
import logo3 from "../assets/Rectangle-21.png";
import "../styles/ServiceStack.css";

const industries = [
  {
    img: logo1,
    title: "Healthcare & Wellness",
    points: [
      "Telemedicine",
      "Health Risk Assessments",
      "Appointment Scheduling",
    ],
  },
  {
    img: logo2,
    title: "Transportation & Logistics",
    points: [
      "Supply Chain Management",
      "Inventory Management",
      "Warehousing and Distribution",
    ],
  },
  {
    img: logo3,
    title: "Hotels & Restaurant",
    points: ["POS System", "Table Management", "Room Service Automation"],
  },
];

const ServiceStack: React.FC = () => {
  return (
    <section className="industries-section">
      <div className="industries-header">
        <h2>
          Industries We <span>Serve</span>
        </h2>
        <p>
          TheBrightLayer caters to diverse industries such as healthcare,
          finance, and manufacturing, leveraging our Custom Web & Mobile App
          Development Services to deliver tailored solutions for each sector’s
          distinct requirements. Whether you need a{" "}
          <a href="#">custom web application</a>, a mobile app, or both, we have
          the expertise to bring your ideas to life. Come together with us, and
          let’s work towards accomplishing your industry-specific objectives as
          a team.
        </p>
      </div>

      <div className="industries-grid">
        {industries.map((item, index) => (
          <div key={index} className="industry-card">
            <img src={item.img} alt={item.title} />
            <div className="industry-content">
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceStack;
