import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import Footer from "./components/Footer";
import { VideoShowcase } from "./components/VideoShowCase";
import ServiceStack from "./components/ServiceStack";
import "./components/App.css";

// Example page components
//import { About } from "./pages/About";
import  About  from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <VideoShowcase />
              <Services />
              <ServiceStack />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
