import { PlusCircle } from "iconoir-react";
import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import { Link } from "react-router";
import AdvertisementTable from "../components/MyAdvertisements/AdvertisementTable";
import UpdateAdvertisement from "../components/MyAdvertisements/UpdateAdvertisement";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
} from "../components/Messages/Alert";

const MyAdvertisements = () => {
  const [myAdvertisements, setMyAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advertisement, setAdvertisement] = useState(null);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/my_advertisements/")
      .then((res) => setMyAdvertisements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // update advertisement
  const updateAdvertisement = (id) => {
    const getAdvertisement = myAdvertisements.find((item) => item.id === id);
    setAdvertisement(getAdvertisement);
  };

  // delete advertisement
  const deleteAdvertisement = (id) => {
    // delete warning
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/my_advertisements/${id}/`);
          if (res.status == 204) {
            // update the local state
            setMyAdvertisements((prevAdvertisements) =>
              prevAdvertisements.filter((item) => item.id !== id)
            );
            // success alert
            handleSuccessMessage(
              "Advertisement Deleted",
              "Your advertisement has been successfully deleted."
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center h-80 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div>
      {advertisement ? (
        <UpdateAdvertisement
          advertisement={advertisement}
          setAdvertisement={setAdvertisement}
          setMyAdvertisements={setMyAdvertisements}
        />
      ) : (
        <div className="w-full bg-white p-4 md:p-6 rounded-lg">
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
              <PlusCircle strokeWidth={2} className="h-4 w-4" /> Add
              Advertisement
            </Button>
          </div>
          {/* Category table  */}
          {myAdvertisements.length === 0 ? (
            <h2 className="text-gray-500 text-lg font-semibold text-center mt-20">
              You do not submit any advertisement yet.
            </h2>
          ) : (
            <AdvertisementTable
              myAdvertisements={myAdvertisements}
              updateAdvertisement={updateAdvertisement}
              deleteAdvertisement={deleteAdvertisement}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
