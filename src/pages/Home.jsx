import React from "react";
import HeroSection from "../components/Home/HeroSection";
import Service from "../components/Home/Service/Service";
import Advertisement from "../components/Home/HomeAdvertisement/Advertisement";
import Contact from "../components/Home/Contact/Contact";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Service />
      <Advertisement />
      <Contact />
    </>
  );
};

export default Home;
