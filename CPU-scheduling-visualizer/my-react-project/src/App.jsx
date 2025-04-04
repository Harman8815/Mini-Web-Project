import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Form from "./components/Form.jsx";
import Whyus from "./components/Whyus.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <Router> {/* Wrap your app inside BrowserRouter */}
      <Navbar />
      <Hero />
      <Whyus />
      <Form />
      <About />
      <Footer />
    </Router>
  );
};

export default App;
