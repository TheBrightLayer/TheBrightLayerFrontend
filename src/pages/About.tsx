import React, { useState, useEffect } from "react";
import "../styles/ServicesPage.css";
import "../styles/About.css";
import logo from "../assets/BrightLayerLogo.png";
import logo1 from "../assets/image-530.webp";
import logo2 from "../assets/image-532.webp";
import logo3 from "../assets/visionaries.webp";
import bgVideo from "../assets/MD_Motion_001.mp4";
import serviceVideo from "../assets/3247036-uhd_3840_2160_25fps.mp4";
import "../styles/Card.css";
import { Link } from "react-router-dom";

interface Service {
  topic: string;
  title: string;
  avatar: string;
  role: string;
  author: string;
  tags: string[];
}

interface Stat {
  value: number;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const services: Service[] = [
  {
    topic: "Enterprise",

    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Enterprise",
    role: "Category",
    author: "Business Solutions",
    tags: ["Software", "Enterprise", "B2B"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=SaaS",
    role: "Category",
    author: "Cloud Services",
    tags: ["SaaS", "Cloud", "Web"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Mobility",
    role: "Category",
    author: "Mobile Apps",
    tags: ["Mobility", "iOS", "Android"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=UX",
    role: "Category",
    author: "Design Team",
    tags: ["UX", "Research", "Design"],
  },
];

const stats: Stat[] = [
  { value: 93, label: "Client Retention" },
  { value: 90, label: "Projects On-Time" },
  { value: 100, label: "Quality of service" },
  { value: 90, label: "Time to Market" },
  { value: 92, label: "Overall Costs" },
];

const faqs: FAQ[] = [
  {
    question: "What is BrightLayer’s mission?",
    answer:
      "At BrightLayer, our mission is to simplify technology for businesses while delivering meaningful impact. We believe that software should not just solve problems, but also inspire innovation and growth. Every solution we design is rooted in practicality, creativity, and a deep understanding of our clients’ needs. For us, success is not just about completing a project—it’s about building long-term partnerships where technology becomes an enabler for lasting progress.",
  },
  {
    question: "What makes BrightLayer different?",
    answer:
      "We don’t just write code—we craft experiences. What sets us apart is our ability to blend innovation with reliability. While many companies focus on speed, we focus equally on quality and scalability, ensuring that every product we create continues to perform as businesses grow. Our process is collaborative: we listen, adapt, and shape solutions that align with both immediate goals and long-term visions. This balance between technical expertise and human-centric design is what makes BrightLayer truly unique.",
  },
  {
    question: "How experienced is your team?",
    answer:
      "Our team is made up of professionals who have collectively spent over a decade solving diverse challenges in software development. From mobile apps and web platforms to enterprise-grade solutions, we’ve worked across industries like healthcare, fintech, education, and e-commerce. Beyond the technical skills, our strength lies in our passion for learning and adapting. Every team member is encouraged to stay ahead of industry trends, explore new technologies, and bring fresh ideas to the table, ensuring that clients always get future-ready solutions.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "Absolutely. BrightLayer has collaborated with early-stage startups, mid-sized businesses, and large enterprises. For startups, we act as technology partners, helping turn ideas into tangible products with scalability in mind. For SMEs, we provide efficiency-driven solutions to streamline processes and improve customer engagement. For enterprises, we focus on robust, large-scale systems built for performance and security. No matter the size of the business, our approach is always flexible, empathetic, and growth-oriented—because every client deserves solutions designed for their unique journey.",
  },
];

const ServicesPage = () => {
  const [scale, setScale] = useState(1);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust this formula to control zoom speed
      const newScale = 1 + Math.min(scrollY / 1000, 0.5);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let start = performance.now();

    const duration = 6000; // animation duration in ms

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);

      setCounts(stats.map((stat) => Math.floor(stat.value * progress)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="services-page">
      {/* Hero Section */}

      <section className="service-hero">
        {/* Background video */}
        <video
          className="service-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={bgVideo}
        />

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Logo in top-left */}
        <div className="hero-logo">
          <Link to="/">
            <img src={logo} alt="BrightLayer Logo" className="logo" />
          </Link>
        </div>

        <div className="service-hero-content">
          <div className="service-hero-heading">
            <h1>
              Our Journey <br />
              <span className="highlight-red">Towards Innovation </span> <br />
              <span className="highlight-red">Together</span>
            </h1>
          </div>

          <div className="service-hero-description">
            <p>
              BrightLayer was founded to spark innovation and create meaningful
              impact through visionary ideas, passionate teamwork, and reliable
              digital solutions.
            </p>
            <button className="black-btn">
              <Link
                to="/contact"
                onClick={handleClick}
                className="getting-started-btn"
              >
                Getting Started
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section className="video-section">
        <div
          className="video-container"
          style={{ transform: `scale(${scale})` }}
        >
          <video autoPlay muted loop playsInline>
            <source src={serviceVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
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

      {/* Contact */}
      <section className="contact">
        <h2>
          Contact <span className="red">Us</span>
        </h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </section>

      <section className="faq">
        <h2>
          Frequently Asked <span className="red">Questions</span>
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
