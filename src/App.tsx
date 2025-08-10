import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import { About } from "./components/About";
import Footer from "./components/Footer";
import { VideoShowcase } from "./components/VideoShowCase";
import "./components/App.css";
import ServiceStack from "./components/ServiceStack";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <VideoShowcase />
      <Services />
      <ServiceStack />
      <Footer />
    </>
  );
}

export default App;
