import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../services/apiClient";
import AdvertisementImageGallery from "../components/AdvertisementDetails/AdvertisementImageGallery";
import {
  Bathroom,
  HouseRooms,
  MapPin,
  Square3dThreePoints,
} from "iconoir-react";
import AdvertisementDetails from "../components/AdvertisementDetails/AdvertisementDetails";
import Review from "../components/Review/Review";

const Advertisements = () => {
  const { advertiseId } = useParams();
  const [advertisement, setAdvertisement] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Advertisement Details
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/advertisements/${advertiseId}/`)
      .then((res) => setAdvertisement(res.data))
      .catch((err) => console.log("Advertisement details error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch Category
  useEffect(() => {
    if (!advertisement?.category) return; // Prevent API call if categoryId is not ready

    apiClient
      .get(`/categories/${advertisement.category}/`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log("Category error:", err));
  }, [advertisement?.category]);

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="loader"></div>
      </div>
    );

  if (!advertisement)
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-xl md:text-3xl font-bold text-red-500">
          No Advertisement Found!!
        </h1>
      </div>
    );

  const details = [
    { icon: HouseRooms, title: `${advertisement.bedroom} Bedroom` },
    { icon: Bathroom, title: `${advertisement.bathroom} Bathroom` },
    { icon: MapPin, title: advertisement.location },
    {
      icon: Square3dThreePoints,
      title: `${advertisement.apartment_size} Square Fit`,
    },
  ];

  return (
    <div className="max-w-[1350px] mx-auto px-4">
      <AdvertisementImageGallery images={advertisement.images} />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 my-10">
        {/* Advertisement Details  */}
        <AdvertisementDetails
          advertisement={advertisement}
          category={category}
          details={details}
        />
        {/* Advertisement Reviews  */}
        <div className="mt-10 lg:mt-0">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
