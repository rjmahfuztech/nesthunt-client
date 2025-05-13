import {
  EditPencil,
  Trash,
  NavArrowDown,
  NavArrowUp,
  HouseRooms,
  Bathroom,
  MapPin,
  Square3dThreePoints,
} from "iconoir-react";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router";
import UserRentRequests from "./UserRentRequests";

const AdvertisementTable = ({
  myAdvertisements,
  updateAdvertisement,
  deleteAdvertisement,
}) => {
  const [openRow, setOpenRow] = useState(null);
  const [showRequests, setShowRequests] = useState(null);

  // Table head
  const TABLE_HEAD = [
    "Title",
    "Description",
    "Price",
    "Status",
    "Details",
    "Edit",
    "Delete",
  ];

  return (
    <div className="mt-4 w-full overflow-x-auto rounded-lg border border-surface">
      <table className="w-full">
        <thead className="border-b border-surface bg-surface-light text-lg font-medium text-black dark:bg-surface-dark">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="px-2.5 py-2 text-start font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="group text-sm text-black dark:text-white">
          {myAdvertisements.map((advertisement, index) => {
            return (
              <React.Fragment key={index}>
                <tr className="border-b border-surface last:border-0">
                  <td className="p-3 min-w-32">
                    <Typography type="small">{advertisement.title}</Typography>
                  </td>
                  <td className="p-3 min-w-80">
                    <Typography type="small">
                      {advertisement.description.slice(0, 50)}...
                    </Typography>
                  </td>
                  <td className="p-3 min-w-24">
                    <Typography type="small">
                      ${advertisement.rental_amount}
                    </Typography>
                  </td>
                  <td className="p-3 min-w-24">
                    <Typography
                      className={`${
                        advertisement.status == "Pending"
                          ? "bg-warning"
                          : advertisement.status == "Approved"
                          ? "bg-success"
                          : "bg-error"
                      } px-3 py-2 rounded-full text-white font-semibold`}
                      type="small"
                    >
                      {advertisement.status}
                    </Typography>
                  </td>
                  <td className="p-3">
                    {openRow === index ? (
                      <Button
                        variant="ghost"
                        className="border-none"
                        onClick={() => setOpenRow(null)}
                      >
                        <NavArrowUp />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="border-none"
                        onClick={() => setOpenRow(index)}
                      >
                        <NavArrowDown />
                      </Button>
                    )}
                  </td>
                  {/* Edit  */}
                  <td className="p-3">
                    <Tooltip>
                      <Tooltip.Trigger
                        as={IconButton}
                        onClick={() => updateAdvertisement(advertisement.id)}
                        variant="ghost"
                        color="secondary"
                      >
                        <EditPencil className="h-5 w-5 text-green-500 dark:text-white" />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Edit Advertisement
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip>
                  </td>
                  {/* Delete  */}
                  <td className="p-3">
                    <Tooltip>
                      <Tooltip.Trigger
                        as={IconButton}
                        onClick={() => deleteAdvertisement(advertisement.id)}
                        variant="ghost"
                        color="secondary"
                      >
                        <Trash className="h-5 w-5 text-red-500 dark:text-white" />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Delete Advertisement
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip>
                  </td>
                </tr>
                {/* advertisement details  */}
                {openRow === index && (
                  <tr>
                    <td colSpan={7} className="p-3 bg-gray-50">
                      <div className="flex gap-4 md:gap-32 items-center">
                        <div>
                          <h2 className="text-xl font-semibold">Title:</h2>
                          <h3 className="text-black text-lg ml-2">
                            {advertisement.title}
                          </h3>
                        </div>
                        <div>
                          {advertisement.status == "Approved" &&
                            (showRequests === index ? (
                              <Button
                                onClick={() => setShowRequests(null)}
                                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                              >
                                Hide Requests
                              </Button>
                            ) : (
                              <Button
                                onClick={() => setShowRequests(index)}
                                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                              >
                                Show Requests
                              </Button>
                            ))}
                        </div>
                      </div>
                      <h2 className="text-lg font-semibold mt-2">
                        Description:
                      </h2>
                      <h3 className="text-black ml-2">
                        {advertisement.description}
                      </h3>
                      <div className="flex gap-2 md:gap-4 flex-wrap items-center mt-4">
                        <span className="flex gap-2 bg-[#bec7d1] px-4 py-2 rounded-full">
                          <HouseRooms />{" "}
                          <span>{advertisement.bathroom} Bedroom</span>
                        </span>
                        <span className="flex gap-2 bg-[#bec7d1] px-4 py-2 rounded-full">
                          <Bathroom />{" "}
                          <span>{advertisement.bathroom} Bathroom</span>
                        </span>
                        <span className="flex gap-2 bg-[#bec7d1] px-4 py-2 rounded-full">
                          <MapPin /> <span>{advertisement.location}</span>
                        </span>
                        <span className="flex gap-2 bg-[#bec7d1] px-4 py-2 rounded-full">
                          <Square3dThreePoints />{" "}
                          <span>{advertisement.apartment_size} Square Fit</span>
                        </span>
                        {advertisement.status == "Approved" && (
                          <Link
                            to={`/rentals/${advertisement.id}`}
                            className="ml-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                          >
                            See more...
                          </Link>
                        )}
                      </div>
                      <div>
                        {showRequests === index && (
                          <div>
                            <hr className="-mx-3 my-3 border-secondary" />
                            {/* user details  */}
                            <UserRentRequests advertiseId={advertisement.id} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementTable;
