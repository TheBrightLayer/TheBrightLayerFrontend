import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import "./components/App.css";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Footer />
    </>
  );
}

export default App;
