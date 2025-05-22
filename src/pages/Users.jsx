import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import defaultProfile from "../assets/images/profile/profileDefault.jpeg";
import { format } from "date-fns";
import { Trash } from "iconoir-react";
import authApiClient from "../services/authApiClient";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
} from "../components/Messages/Alert";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get("/auth/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Delete user
  const deleteUser = (id) => {
    // delete warning
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(`/auth/users/${id}/`);
          if (res.status == 204) {
            // update local state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            // success message
            handleSuccessMessage(
              "User Deleted",
              "User has been successfully deleted"
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };
  // user table header
  const TABLE_HEAD = [
    "User",
    "Address",
    "Phone",
    "Join Date",
    "Last Login",
    "Delete",
  ];

  if (loading)
    return (
      <div className="flex justify-center h-72 items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg">
      <div>
        <Typography type="h6">All User list</Typography>
        <Typography className="mt-1">
          See information about all users
        </Typography>
      </div>
      {/* Table start  */}
      {users.length === 0 ? (
        <h2 className="text-gray-500 text-lg font-semibold text-center my-14 md:my-20">
          No Users Found
        </h2>
      ) : (
        <div className="mt-4 w-full overflow-x-auto rounded-lg border border-surface mb-10">
          <table className="w-full">
            <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="px-2.5 py-2 min-w-32 text-start font-medium"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="group text-sm text-black dark:text-white">
              {users.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="border-b border-surface last:border-0"
                  >
                    <td className="p-3 min-w-72">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.profile_image || defaultProfile}
                          alt="Profile Image"
                          size="sm"
                          className="bg-blue-900 object-contain"
                        />
                        <div className="flex flex-col">
                          <Typography type="small">
                            {user.first_name} {user.last_name}
                          </Typography>
                          <Typography type="small" className="opacity-70">
                            {user.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 min-w-48">
                      <Typography type="small" className="opacity-70">
                        {user.address || "Address didn't set"}
                      </Typography>
                    </td>
                    <td className="p-3 min-w-32">
                      <Typography type="small" className="opacity-70">
                        {user.phone_number || "Number didn't set"}
                      </Typography>
                    </td>
                    <td className="p-3">
                      <Typography type="small">
                        {format(new Date(user.date_joined), "yyyy/MM/dd")}
                      </Typography>
                    </td>
                    <td className="p-3">
                      <Typography type="small">
                        {user.last_login
                          ? format(
                              new Date(user.last_login),
                              "MMMM d, yyyy, h:mm a"
                            )
                          : "Never"}
                      </Typography>
                    </td>
                    <td className="p-3">
                      <Tooltip>
                        <Tooltip.Trigger
                          as={IconButton}
                          onClick={() => deleteUser(user.id)}
                          variant="ghost"
                          color="secondary"
                        >
                          <Trash className="h-5 w-5 text-red-500 dark:text-white" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          Delete User
                          <Tooltip.Arrow />
                        </Tooltip.Content>
                      </Tooltip>
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

export default Users;
