import React from "react";
import HeroSection from "../components/Home/HeroSection";
import Service from "../components/Home/Service/Service";
import Advertisement from "../components/Home/HomeAdvertisement/Advertisement";
import Contact from "../components/Home/Contact/Contact";
import About from "../components/Home/About/About";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Service />
      <Advertisement />
      <About />
      <Contact />
    </>
  );
};

export default Home;
