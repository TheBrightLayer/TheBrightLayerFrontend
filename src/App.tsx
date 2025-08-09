import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio"; 
import Testimonials from "./components/Testimonials";
import { About } from "./components/About";
import Footer from "./components/Footer";
import "./components/App.css";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <About />
      <Footer />
    </>
  );
}

export default App;
