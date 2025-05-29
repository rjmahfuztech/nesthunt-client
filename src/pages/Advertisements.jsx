import { NavArrowDown, NavArrowUp, Trash } from "iconoir-react";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import authApiClient from "../services/authApiClient";
import AdvertisementOwnerInfo from "../Advertisements/AdvertisementOwnerInfo";
import AdvertisementUpdateStatus from "../Advertisements/AdvertisementUpdateStatus";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
} from "../components/Messages/Alert";
import Pagination from "../components/Pagination";

const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Table head
  const TABLE_HEAD = [
    "Title",
    "Description",
    "Price",
    "Details",
    "Status",
    "Delete",
  ];

  // Load advertisements
  useEffect(() => {
    const fetchAdvertisements = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get(
          `/advertisements/?page=${currentPage}`
        );
        const data = await response.data;
        setAdvertisements(data.results);
        if (data.results.length === 10)
          setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvertisements();
  }, [currentPage]);

  // Delete advertisement
  const deleteAdvertisement = (id) => {
    // delete warning
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/advertisements/${id}/`);
          if (res.status == 204) {
            if (res.status == 204) {
              // update the local state
              setAdvertisements((prevAdvertisements) =>
                prevAdvertisements.filter((item) => item.id !== id)
              );
              // success alert
              handleSuccessMessage(
                "Advertisement Deleted",
                "Your advertisement has been successfully deleted."
              );
            }
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
    <div className="w-full bg-white p-4 md:p-6 rounded-lg">
      <div className="mb-8">
        <Typography type="h6">Advertisement list</Typography>
        <Typography className="mt-1">
          See information about all advertisements
        </Typography>
      </div>
      {/* Category table  */}
      {advertisements.length === 0 ? (
        <h2 className="text-gray-500 text-lg font-semibold text-center mt-20">
          No advertisements available
        </h2>
      ) : (
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
              {advertisements.map(
                ({ id, title, description, rental_amount, status, owner }) => {
                  return (
                    <React.Fragment key={id}>
                      <tr className="border-b border-surface last:border-0">
                        <td className="p-3 min-w-32">
                          <Typography type="small">{title}</Typography>
                        </td>
                        <td className="p-3 min-w-80">
                          <Typography type="small">
                            {description.slice(0, 50)}...
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography type="small">${rental_amount}</Typography>
                        </td>
                        <td className="p-3">
                          <Typography type="small">
                            {openRow === id ? (
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
                                onClick={() => setOpenRow(id)}
                              >
                                <NavArrowDown />
                              </Button>
                            )}
                          </Typography>
                        </td>
                        {/* Edit  */}
                        <td className="p-3">
                          <AdvertisementUpdateStatus
                            status={status}
                            id={id}
                            setAdvertisements={setAdvertisements}
                          />
                        </td>
                        {/* Delete  */}
                        <td className="p-3">
                          <Tooltip>
                            <Tooltip.Trigger
                              as={IconButton}
                              onClick={() => deleteAdvertisement(id)}
                              variant="ghost"
                              color="secondary"
                            >
                              <Trash className="h-5 w-5 text-red-500 dark:text-white" />
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                              Delete Category
                              <Tooltip.Arrow />
                            </Tooltip.Content>
                          </Tooltip>
                        </td>
                      </tr>
                      {/* is open row */}
                      {openRow === id && (
                        <AdvertisementOwnerInfo id={id} owner={owner} />
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-end mt-8">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Advertisements;
