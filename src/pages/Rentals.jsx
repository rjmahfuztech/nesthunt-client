import AdvertisementInfo from "../components/Home/HomeAdvertisement/AdvertisementInfo";
import FilterSection from "../components/FilterSection/FilterSection";
import useFetchAdvertisement from "../hooks/useFetchAdvertisement";
import useAppContext from "../hooks/useAppContext";
import FadeIn from "../components/Animation/FadeIn";
import StaggerFadeIn from "../components/Animation/StaggerFadeIn";

const Rentals = () => {
  // import from AppContext
  const { filter, register, handleSubmit, onSubmit, control } = useAppContext();

  const { advertisements, loading } = useFetchAdvertisement({
    category: filter?.category || "",
    searchQuery: filter?.searchQuery || "",
    bedroom: filter?.bedroom || "",
    bathroom: filter?.bathroom || "",
    minAmount: filter?.minAmount || "",
    maxAmount: filter?.maxAmount || "",
  });

  return (
    <div className="max-w-[1350px] mx-auto px-4 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-4 md:gap-6">
        <div className="col-span-2 order-2 md:order-1">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-20">
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
        </div>
        {/* Filter section  */}
        <div className="order-1 md:order-2 relative">
          <FadeIn x={50} y={0} delay={0.3}>
            <div className="mb-4 md:mb-20 md:sticky top-20">
              <h2 className="text-3xl font-bold uppercase my-10 max-w-80 border-b-2 border-b-orange-400">
                Search Here
              </h2>
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
    </div>
  );
};

export default Rentals;
