import { CheckCircle, LockSquare, LotOfCash } from "iconoir-react";
import { Button } from "@material-tailwind/react";

const AdvertisementDetails = ({ advertisement, category, details }) => {
  return (
    <div className="col-span-2">
      <div className="bg-[#F0F2F4] p-4 rounded-lg">
        <h2 className="text-xl md:text-3xl font-semibold my-4">
          {advertisement.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <h3 className="flex gap-2 items-center text-lg md:text-xl">
            <LotOfCash strokeWidth={1.5} />{" "}
            <span>${advertisement.rental_amount}</span>
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
        disabled={advertisement.is_rented}
        className="w-full bg-green-600 px-8 mt-2 py-3 font-bold hover:bg-green-700 border-none"
      >
        {advertisement.is_rented ? "Not Available" : "Send Rent Request"}
      </Button>
    </div>
  );
};

export default AdvertisementDetails;
