import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import apiClient from "../services/apiClient";
import AdvertisementImageGallery from "../components/AdvertisementDetails/AdvertisementImageGallery";
import {
  Bathroom,
  DotArrowLeft,
  HeartSolid,
  HouseRooms,
  MapPin,
  Square3dThreePoints,
} from "iconoir-react";
import AdvertisementDetails from "../components/AdvertisementDetails/AdvertisementDetails";
import Review from "../components/Review/Review";
import { Button } from "@material-tailwind/react";
import authApiClient from "../services/authApiClient";
import {
  handleApiError,
  handleSuccessMessage,
  handleWarningMessage,
} from "../components/Messages/Alert";
import useAuthContext from "../hooks/useAuthContext";
import FadeIn from "../components/Animation/FadeIn";
import SuggestedAdvertisement from "../components/AdvertisementDetails/SuggestedAdvertisement";

const AdvertisementDetail = () => {
  const { advertiseId } = useParams();
  const [advertisement, setAdvertisement] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  // Fetch Advertisement Details
  useEffect(() => {
    setLoading(true);
    authApiClient
      .get(`/advertisements/${advertiseId}/`)
      .then((res) => setAdvertisement(res.data))
      .catch((err) => console.log("Advertisement details error:", err))
      .finally(() => setLoading(false));
  }, [advertiseId]);

  // Fetch Category
  useEffect(() => {
    if (!advertisement?.category) return; // Prevent API call if categoryId is not ready

    apiClient
      .get(`/categories/${advertisement.category}/`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log("Category error:", err));
  }, [advertisement?.category]);

  // Save to favorite list
  const handleAddToFavorite = async () => {
    if (!user)
      return handleWarningMessage(
        "Login Required",
        "To add favorite, you must need to login/register first."
      );
    try {
      const res = await authApiClient.post(`/favourites/`, {
        advertisement_id: advertiseId,
      });
      if (res.status == 201) {
        handleSuccessMessage(
          "Saved",
          "This advertisement is saved to your favorite list."
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

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
    <div className="max-w-[1350px] mx-auto px-4 mt-32 overflow-x-hidden">
      <div className="flex gap-2 justify-between items-center mt-10 -mb-5">
        <FadeIn y={0} x={-50} duration={0.3} delay={0.1}>
          <Button
            color="ghost"
            as={Link}
            to="/rentals"
            className="border-none shadow-none hover:shadow-none hover:-ml-2 font-semibold flex gap-2 items-center hover:text-gray-500"
          >
            <DotArrowLeft />
            <span>Back to Rentals</span>
          </Button>
        </FadeIn>
        <FadeIn y={0} x={50} duration={0.3} delay={0.1}>
          <Button
            variant="ghost"
            onClick={handleAddToFavorite}
            className="flex gap-2 items-center font-semibold"
          >
            <span>Add Favorite </span> <HeartSolid className="text-red-500" />
          </Button>
        </FadeIn>
      </div>
      {/* Advertisement Image gallery  */}
      <FadeIn duration={0.3} delay={0.1}>
        <AdvertisementImageGallery images={advertisement.images} />
      </FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 my-10">
        {/* Advertisement Details  */}
        <div className="col-span-2">
          <AdvertisementDetails
            advertisement={advertisement}
            category={category}
            details={details}
          />
          {/* Related house advertisement */}
          <SuggestedAdvertisement
            advertiseId={advertiseId}
            categoryId={advertisement.category}
          />
        </div>
        {/* Advertisement Reviews  */}
        <div className="mt-10 lg:mt-0">
          <FadeIn y={0} x={50}>
            <Review advertiseId={advertiseId} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementDetail;
