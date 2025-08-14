import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoShowcase } from "./components/VideoShowCase";
import { Services } from "./components/Services";
import Footer from "./components/Footer";
import ServiceStack from "./components/ServiceStack";
import "./components/App.css";

import About from "./pages/About";
import Contact from "./pages/Contact";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/"; // Only show Hero on home page

  return (
    <>
      <Header />
      {isHome && (
        <>
          <Hero />
          <VideoShowcase />
          <Services />
          <ServiceStack />
        </>
      )}
      {!isHome && (
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
