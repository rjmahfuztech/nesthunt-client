import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import AdvertisementInfo from "../components/Home/HomeAdvertisement/AdvertisementInfo";
import FilterSection from "../components/FilterSection/FilterSection";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/advertisements/")
      .then((res) => setRentals(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  console.log(rentals);
  return (
    <div className="max-w-[1350px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-4 md:gap-6">
        <div className="col-span-2 order-2 md:order-1">
          <h2 className="text-3xl font-bold uppercase my-10 max-w-80 border-b-2 border-b-orange-400">
            All Rentals
          </h2>
          {/* Loading */}
          {loading && (
            <div className="flex justify-center mt-32">
              <div className="loader"></div>
            </div>
          )}
          {/* advertisement data  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-20">
            {rentals.map((rental) => (
              <AdvertisementInfo key={rental.id} advertisement={rental} />
            ))}
          </div>
        </div>
        {/* Filter section  */}
        <div className="relative order-1 md:order-2">
          <div className="mb-4 md:mb-20 sticky top-10">
            <h2 className="text-3xl font-bold uppercase my-10 max-w-80 border-b-2 border-b-orange-400">
              Search Here
            </h2>
            <FilterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
