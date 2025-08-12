import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";

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
