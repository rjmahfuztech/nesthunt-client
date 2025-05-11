import { CheckCircle, LockSquare, LotOfCash } from "iconoir-react";
import { Button, Spinner } from "@material-tailwind/react";
import authApiClient from "../../services/authApiClient";
import {
  handleApiError,
  handleSuccessMessage,
  handleWarningMessage,
} from "../Messages/Alert";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

const AdvertisementDetails = ({ advertisement, category, details }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  // Send rent request
  const handleRentRequest = async () => {
    if (!user)
      return handleWarningMessage(
        "Login Required",
        "To send request, you must need to login/register first."
      );
    setLoading(true);
    try {
      const res = await authApiClient.post(`/my_rent_requests/`, {
        advertisement_id: advertisement.id,
      });
      // success alert
      if (res.status == 201) {
        handleSuccessMessage(
          "Request Sent",
          "Your rent request for this advertisement has been successfully sent."
        );
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="col-span-2">
      <div className="bg-[#F0F2F4] p-4 rounded-lg">
        <h2 className="text-xl md:text-3xl font-semibold my-4">
          {advertisement.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <h3 className="flex gap-2 items-center text-lg md:text-xl">
            <LotOfCash strokeWidth={1.5} />{" "}
            <span>${advertisement.rental_amount}/Month</span>
          </h3>
          {advertisement.is_rented ? (
            <h3 className="flex gap-2 items-center text-lg md:text-xl">
              <LockSquare strokeWidth={1.5} /> <span>Not Available</span>
            </h3>
          ) : (
            <h3 className="flex gap-2 items-center text-lg md:text-xl">
              <CheckCircle strokeWidth={1.5} /> <span>Available</span>
            </h3>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold mt-4">About Category:</h3>
        <h3 className="text-lg">
          <b>{">>"}</b> <span>{category?.name}</span>
        </h3>
        <p className="text gray-500">{category?.description}</p>
      </div>
      {/* Details  */}
      <div className="mt-4 bg-[#F0F2F4] p-4 rounded-lg">
        <h2 className="text-lg md:text-2xl font-semibold">Details:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {details.map((detail, index) => (
            <h3
              key={index}
              className="flex gap-2 items-center text-lg md:text-xl"
            >
              <detail.icon strokeWidth={1.5} /> <span>{detail.title}</span>
            </h3>
          ))}
        </div>
      </div>
      {/* Description  */}
      <div className="mt-4 bg-[#F0F2F4] p-4 rounded-lg">
        <h2 className="text-lg md:text-2xl font-semibold">Details:</h2>
        <p className="text gray-500 mt-2">{category?.description}</p>
      </div>
      <Button
        onClick={handleRentRequest}
        disabled={advertisement.is_rented || loading}
        className="w-full bg-green-600 px-8 mt-2 py-3 font-bold hover:bg-green-700 border-none"
      >
        {advertisement.is_rented ? (
          "Not Available"
        ) : (
          <>
            {loading ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Sending request...
              </span>
            ) : (
              "Send Rent Request"
            )}
          </>
        )}
      </Button>
    </div>
  );
};

export default AdvertisementDetails;
