import { Button } from "@material-tailwind/react";
import FilterSection from "../FilterSection/FilterSection";
import useAppContext from "../../hooks/useAppContext";
import useFetchAdvertisement from "../../hooks/useFetchAdvertisement";
import heroHouseImage from "../../assets/images/heroHouse.jpeg";
import { Link } from "react-router";
import FadeIn from "../Animation/FadeIn";

const HeroSection = () => {
  // Filter advertisement from Home page
  const { filter, register, handleSubmit, onSubmit, control } = useAppContext();
  useFetchAdvertisement({
    category: filter?.category || "",
    searchQuery: filter?.searchQuery || "",
    bedroom: filter?.bedroom || "",
    bathroom: filter?.bathroom || "",
    minAmount: filter?.minAmount || "",
    maxAmount: filter?.maxAmount || "",
  });

  return (
    <div className="relative py-24 bg-gradient-to-r from-purple-600 to-blue-600 sm:h-screen text-white overflow-hidden p-4 md:px-10 lg:px-20">
      <div className="absolute inset-0">
        <img
          src={heroHouseImage}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 justify-center gap-10 xl:gap-60 items-center h-full">
        <FadeIn x={-50} y={0} delay={0.2}>
          <div className="max-w-xl mx-auto md:mx-0 md:ml-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-5 md:mt-0">
              Find Your Property
            </h1>
            <p className="text-lg text-gray-300 my-6 md:my-10">
              Gain access to comprehensive and minute knowledge of the local{" "}
              <br />
              property market, allowing you to fully understand.
            </p>
            <Button
              as={Link}
              to="/rentals"
              className="bg-green-600 px-10 py-3 font-bold hover:bg-green-700 border-none mt-2"
            >
              Find House
            </Button>
          </div>
        </FadeIn>
        {/* Filter card */}
        <FadeIn delay={0.2}>
          <div className="md:ml-16">
            <FilterSection
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              control={control}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default HeroSection;
