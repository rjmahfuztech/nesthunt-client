import { Typography, Chip, Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../../services/authApiClient";
import defaultProfile from "../../assets/images/profile/profileDefault.jpeg";
import { format } from "date-fns";

const UserRentRequests = ({ advertiseId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get(`/my_advertisements/${advertiseId}/rent_requests/`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const TABLE_HEAD = ["User", "Address", "Status", "Request Date"];

  if (loading)
    return (
      <div className="flex justify-center h-72 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div>
      <div>
        <Typography type="h6">Requested User list</Typography>
        <Typography className="mt-1">
          See information about all requests
        </Typography>
      </div>
      {/* Table start  */}
      {requests.length === 0 ? (
        <h2 className="text-gray-500 text-lg font-semibold text-center my-14 md:my-20">
          No Category available
        </h2>
      ) : (
        <div className="mt-4 w-full overflow-hidden rounded-lg border border-surface mb-10">
          <table className="w-full">
            <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="px-2.5 py-2 text-start font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="group text-sm text-black dark:text-white">
              {requests.map((request) => {
                return (
                  <tr
                    key={request.id}
                    className="border-b border-surface last:border-0"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={request.user.profile_image || defaultProfile}
                          alt="Profile Image"
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography type="small">
                            {request.user.name}
                          </Typography>
                          <Typography type="small" className="opacity-70">
                            {request.user.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Typography type="small" className="opacity-70">
                        {request.user.address || "Address didn't set"}
                      </Typography>
                    </td>
                    <td className="p-3">
                      <div className="w-max">
                        <Chip size="sm" color="success">
                          <Chip.Label>{request.status}</Chip.Label>
                        </Chip>
                      </div>
                    </td>
                    <td className="p-3">
                      <Typography type="small">
                        {format(new Date(request.created_at), "yyyy/MM/dd")}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRentRequests;
