import { Input } from "@material-tailwind/react";
import React from "react";
import HeroSection from "../components/Home/HeroSection";
import Service from "../components/Home/Service/Service";
import Advertisement from "../components/Home/HomeAdvertisement/Advertisement";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Service />
      <Advertisement />
    </>
  );
};

export default Home;
