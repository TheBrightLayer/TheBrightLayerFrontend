import "../styles/Services.css";
import "../styles/Card.css"; // Copy your card.css styles into here
import { Link } from "react-router-dom";
export function Services() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const services = [
    {    date: "2025-08-15", // <-- add this

      title: "Enterprise Software",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Enterprise",
      role: "Category",
      author: "Business Solutions",
      tags: ["Software", "Enterprise", "B2B"]
    },
    {      date: "2025-08-15", // <-- add this

      title: "SaaS Application",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=SaaS",
      role: "Category",
      author: "Cloud Services",
      tags: ["SaaS", "Cloud", "Web"]
    },
    {      date: "2025-08-15", // <-- add this

      title: "Enterprise Mobility Solutions",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Mobility",
      role: "Category",
      author: "Mobile Apps",
      tags: ["Mobility", "iOS", "Android"]
    },
    {    date: "2025-08-15", // <-- add this

      title: "UX Research",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=UX",
      role: "Category",
      author: "Design Team",
      tags: ["UX", "Research", "Design"]
    },
  ];

  return (
    <section className="services-section">
      {/* Heading */}
      <h2>
        Services <span className="red">We Offer</span>
      </h2>

      {/* Description */}
      <p>
        Welcome to TheBrightLayer, where we specialize in empowering businesses
        to excel in the digital landscape. Our comprehensive services include
        custom website and <a href="#mobile-app">mobile app development</a>, as
        well as <a href="#software-solutions">tailored software solutions</a>.
      </p>
      <p>
        We guarantee to achieve and surpass your business objectives. Our goal
        is to deliver results that not only meet your needs but also add
        significant value to your business.
      </p>

      {/* Card List */}
      <section className="card-list">
        {services.map((service, index) => (
          <article className="card" key={index}>
            <header className="card-header">
              <h2>{service.title}</h2>
            </header>

            <div className="card-author">
              <a className="author-avatar" href="#">
                <img src={service.avatar} alt={service.author} />
              </a>
              <svg className="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
              </svg>
              <div className="author-name">
                <div className="author-name-prefix">{service.role}</div>
                {service.author}
              </div>
            </div>

            <div className="tags">
              {service.tags.map((tag, tIndex) => (
                <a href="#" key={tIndex}>
                  {tag}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <div className="cta-row">
        <div className="cta-box">
          <h3>Didn’t find what you are looking for?</h3>
          <button className="outline-btn">
            {" "}
            <Link to="/contact" className="getting-started-btn">
              Connect With Us
            </Link>
          </button>
        </div>
        <div className="cta-box">
          <h3>Ready to start your Project?</h3>
          <button className="filled-btn">
            <Link
              to="/contact"
              onClick={handleClick}
              className="getting-started-btn"
            >
              Let's Chat
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
