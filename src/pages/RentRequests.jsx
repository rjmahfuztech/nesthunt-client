import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
} from "../components/Messages/Alert";
import RentRequestCard from "../components/RentRequests/RentRequestCard";

const RentRequests = () => {
  const [rentRequests, setRentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advertiseId, setAdvertiseId] = useState(null);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/my_rent_requests/")
      .then((res) => setRentRequests(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Delete requested rent
  const handleDeleteRequest = async (id) => {
    // success alert
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/my_rent_requests/${id}/`);
          if (res.status == 204) {
            // Update the local state
            setRentRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== id)
            );
            handleSuccessMessage(
              "Request Deleted!",
              "Your rent request has been successfully deleted."
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
    <>
      <h1 className="text-xl md:text-2xl font-bold my-8">My rent requests:</h1>
      {rentRequests.length === 0 && (
        <h2 className="text-lg md:text-xl font-semibold text-gray-500 my-10 text-center">
          You didn't request for any advertisement yet
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rentRequests.map((data) => (
          <RentRequestCard
            key={data.id}
            data={data}
            handleDeleteRequest={handleDeleteRequest}
            advertiseId={advertiseId}
            setAdvertiseId={setAdvertiseId}
          />
        ))}
      </div>
    </>
  );
};

export default RentRequests;
