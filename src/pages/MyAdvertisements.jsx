import { PlusCircle } from "iconoir-react";
import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import { Link } from "react-router";
import AdvertisementTable from "../components/MyAdvertisements/AdvertisementTable";

const MyAdvertisements = () => {
  const [myAdvertisements, setMyAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/my_advertisements/")
      .then((res) => setMyAdvertisements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Add advertisement

  if (loading)
    return (
      <div className="flex justify-center h-80 items-center">
        <div className="loader"></div>
      </div>
    );

  console.log(myAdvertisements);
  return (
    <div>
      <div className="w-full bg-white p-2">
        <div className="mb-8 flex items-center justify-between gap-4 md:gap-8">
          <div>
            <Typography type="h6">My Advertisement list</Typography>
            <Typography className="mt-1">
              See information about advertisements
            </Typography>
          </div>
          <Button
            as={Link}
            to="/dashboard/advertisement/add"
            className="flex items-center gap-3"
            size="sm"
          >
            <PlusCircle strokeWidth={2} className="h-4 w-4" /> Add Advertisement
          </Button>
        </div>
        {/* Category table  */}
        {myAdvertisements.length === 0 ? (
          <h2 className="text-gray-500 text-lg font-semibold text-center mt-20">
            You do not submit any advertisement yet.
          </h2>
        ) : (
          <AdvertisementTable myAdvertisements={myAdvertisements} />
        )}
      </div>
    </div>
  );
};

export default MyAdvertisements;
