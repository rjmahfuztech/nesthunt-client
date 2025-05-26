import AdvertisementInfo from "../components/Home/HomeAdvertisement/AdvertisementInfo";
import FilterSection from "../components/FilterSection/FilterSection";
import useFetchAdvertisement from "../hooks/useFetchAdvertisement";
import useAppContext from "../hooks/useAppContext";
import FadeIn from "../components/Animation/FadeIn";
import StaggerFadeIn from "../components/Animation/StaggerFadeIn";
import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { useState } from "react";

const Rentals = () => {
  // import from AppContext
  const { filter, register, handleSubmit, onSubmit, control } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);

  const { advertisements, loading, totalPages } = useFetchAdvertisement({
    category: filter?.category || "",
    searchQuery: filter?.searchQuery || "",
    bedroom: filter?.bedroom || "",
    bathroom: filter?.bathroom || "",
    minAmount: filter?.minAmount || "",
    maxAmount: filter?.maxAmount || "",
    currentPage: currentPage,
  });

  return (
    <div className="max-w-[1350px] mx-auto px-4 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-4 md:gap-6">
        <div className="col-span-2 order-2 md:order-1 relative">
          <FadeIn x={-50} y={0} delay={0.3}>
            <h2 className="text-3xl font-bold uppercase my-10 max-w-80 border-b-2 border-b-orange-400">
              All Rentals
            </h2>
          </FadeIn>
          {/* Loading */}
          {loading ? (
            <div className="flex justify-center my-20 md:my-32">
              <div className="loader"></div>
            </div>
          ) : advertisements.length === 0 ? (
            <h2 className="text-gray-500 text-lg font-semibold text-center my-14 md:my-20">
              No advertisement available
            </h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-32 md:mb-40">
              {advertisements.map((advertisement, index) => (
                <StaggerFadeIn
                  key={advertisement.id}
                  index={index}
                  y={50}
                  duration={1.5}
                  delay={0.1}
                  scale={1}
                >
                  <AdvertisementInfo advertisement={advertisement} />
                </StaggerFadeIn>
              ))}
            </div>
          )}
          {/* Pagination  */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 absolute bottom-10">
              <Button
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                variant="ghost"
              >
                <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <IconButton
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                  }}
                  variant={currentPage == i + 1 ? "solid" : "ghost"}
                >
                  {i + 1}
                </IconButton>
              ))}
              <Button
                disabled={currentPage == totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                variant="ghost"
              >
                Next
                <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
              </Button>
            </div>
          </div>
        </div>
        {/* Filter section  */}
        <div className="order-1 md:order-2 relative overflow-visible">
          <div className="mb-4 md:mb-20 sticky top-20">
            <FadeIn x={50} y={0} delay={0.3}>
              <h2 className="text-3xl font-bold uppercase my-10 max-w-80 border-b-2 border-b-orange-400">
                Search Here
              </h2>
              <FilterSection
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                control={control}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
