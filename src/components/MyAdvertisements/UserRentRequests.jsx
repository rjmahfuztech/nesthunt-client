import { Typography, Avatar, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import authApiClient from "../../services/authApiClient";
import defaultProfile from "../../assets/images/profile/profileDefault.jpeg";
import { format } from "date-fns";
import { handleApiError, Toast } from "../Messages/Alert";

const UserRentRequests = ({ advertiseId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get(`/my_advertisements/${advertiseId}/rent_requests/`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [advertiseId]);

  // update status
  const updateStatus = async (id, status) => {
    try {
      const res = await authApiClient.patch(
        `/my_advertisements/${advertiseId}/rent_requests/${id}/`,
        { status: status }
      );
      if (res.status == 200) {
        setValue(status);
        // success alert
        await Toast.fire({
          icon: "success",
          html: `status <span class="text-black font-bold">${status}</span> successfully updated`,
        });
        // update local state status
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id
              ? { ...req, status: status }
              : status == "Approved"
              ? { ...req, status: "Rejected" }
              : req
          )
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

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
                          className="bg-blue-900 object-contain"
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
                      <Typography type="small">
                        {format(new Date(request.created_at), "yyyy/MM/dd")}
                      </Typography>
                    </td>
                    <td className="p-3">
                      <Select
                        // disabled={request.status == "Rejected" || "Approved"}
                        value={value}
                        onValueChange={(val) => updateStatus(request.id, val)}
                        size="sm"
                      >
                        <Select.Trigger
                          placeholder={request.status}
                          className={`${
                            request.status == "Pending"
                              ? "bg-warning hover:border-warning"
                              : request.status == "Approved"
                              ? "bg-success hover:border-success"
                              : "bg-error hover:border-error"
                          } w-28 text-white`}
                        />
                        <Select.List>
                          <Select.Option value="Pending">Pending</Select.Option>
                          <Select.Option value="Approved">
                            Approved
                          </Select.Option>
                          <Select.Option value="Rejected">
                            Rejected
                          </Select.Option>
                        </Select.List>
                      </Select>
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
