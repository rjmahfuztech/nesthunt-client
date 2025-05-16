import {
  Card,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Dialog,
} from "@material-tailwind/react";
import {
  HouseRooms,
  Bathroom,
  MapPin,
  Square3dThreePoints,
  Trash,
  Xmark,
} from "iconoir-react";
import ModalForm from "./ModalForm";
import { useState } from "react";

const RentRequestCard = ({
  data,
  handleDeleteRequest,
  advertiseId,
  setAdvertiseId,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="w-full flex flex-col h-full">
      <Card.Body className="p-4 flex flex-col flex-grow">
        <div className="flex gap-2 justify-between items-center mb-4">
          <Typography className="font-bold text-foreground text-xl">
            ${data.advertisement.rental_amount}/Month
          </Typography>
          <div className="flex gap-4 items-center">
            <Typography
              type="small"
              className={`${
                data.status == "Pending"
                  ? "bg-warning"
                  : data.status == "Approved"
                  ? "bg-success"
                  : "bg-error"
              } px-4 py-2 rounded-full text-white font-semibold border-none`}
            >
              {data.status}
            </Typography>
            <Tooltip>
              <Tooltip.Trigger
                as={IconButton}
                onClick={() => handleDeleteRequest(data.id)}
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
          <Dialog open={open} onOpenChange={setOpen} size="sm">
            <Button
              isFullWidth
              className="mb-2 flex w-fit items-center gap-2"
              onClick={() => (
                setAdvertiseId(data.advertisement.id), setOpen(true)
              )}
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
            <Dialog.Overlay>
              <Dialog.Content>
                <Dialog.DismissTrigger
                  as={IconButton}
                  size="sm"
                  variant="ghost"
                  isCircular
                  color="secondary"
                  className="absolute right-2 top-2"
                >
                  <Xmark className="h-5 w-5" />
                </Dialog.DismissTrigger>
                <div className="grid bg-black mt-8 min-h-24 max-h-36 place-items-center shadow-none">
                  <Typography
                    as="span"
                    type="h4"
                    className="text-primary-foreground"
                  >
                    Your Information
                  </Typography>
                </div>
                {/* form  */}
                <ModalForm advertiseId={advertiseId} />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RentRequestCard;
