import {
  Card,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import {
  HouseRooms,
  Bathroom,
  MapPin,
  Square3dThreePoints,
  Trash,
} from "iconoir-react";

const RentRequests = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/my_rent_requests/")
      .then((res) => setAdvertisements(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center h-80 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {advertisements.map((data) => (
        <Card key={data.id} className="w-full flex flex-col h-full">
          <Card.Body className="p-4 flex flex-col flex-grow">
            <div className="flex gap-2 justify-between items-center mb-4">
              <Typography className="font-bold text-foreground text-xl">
                ${data.advertisement.rental_amount}/Month
              </Typography>
              <div className="flex gap-2 items-center">
                <Typography
                  type="small"
                  className="font-bold bg-green-500 px-4 py-2 rounded-full text-white uppercase"
                >
                  {data.status}
                </Typography>
                <Tooltip>
                  <Tooltip.Trigger
                    as={IconButton}
                    //   onClick={() => deleteCategory(id)}
                    variant="ghost"
                    color="secondary"
                    className="bg-red-200 rounded-full hover:bg-red-300"
                  >
                    <Trash className="h-5 w-5 text-red-500" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Delete Request
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>
            <hr className="-mx-3 my-3 border-secondary" />
            <Typography type="h5" className="mb-2">
              {data.advertisement.title}
            </Typography>
            <Typography className="mb-8 text-foreground">
              {data.advertisement.description}
            </Typography>
            {/* details  */}
            <div className="flex gap-3 md:items-center flex-wrap">
              <span className="flex gap-2 items-center bg-[#F1F5F9] px-2 py-1 rounded-full">
                <HouseRooms strokeWidth={1.5} />{" "}
                <span>{data.advertisement.bedroom} Bedroom</span>
              </span>
              <span className="flex gap-2 items-center bg-[#F1F5F9] px-2 py-1 rounded-full">
                <Bathroom strokeWidth={1.5} />{" "}
                <span>{data.advertisement.bathroom} Bathroom</span>
              </span>
              <span className="flex gap-2 items-center bg-[#F1F5F9] px-2 py-1 rounded-full">
                <MapPin strokeWidth={1.5} />{" "}
                <span>{data.advertisement.location}</span>
              </span>
              <span className="flex gap-2 items-center bg-[#F1F5F9] px-2 py-1 rounded-full">
                <Square3dThreePoints strokeWidth={1.5} />{" "}
                <span>{data.advertisement.apartment_size} Sqrt</span>
              </span>
            </div>
            <div className="mt-auto pt-4">
              <Button
                isFullWidth
                as="a"
                href="#"
                className="mb-2 flex w-fit items-center gap-2"
              >
                Book Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RentRequests;
