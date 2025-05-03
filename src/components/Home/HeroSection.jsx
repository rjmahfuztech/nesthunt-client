import React from "react";
import { Button } from "@material-tailwind/react";
import FilterSection from "../FilterSection/FilterSection";

const HeroSection = () => {
  return (
    <div className="">
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 sm:h-screen text-white overflow-hidden p-4 md:px-10 lg:px-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-center gap-10 lg:gap-30 xl:gap-60 items-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Find Your Property
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Gain access to comprehensive and minute knowledge of the local{" "}
              <br />
              property market, allowing you to fully understand.
            </p>
            <Button className="bg-green-600 px-8 py-3 font-bold hover:bg-green-700 border-none">
              Find House
            </Button>
          </div>
          {/* Filter card */}
          <FilterSection />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
