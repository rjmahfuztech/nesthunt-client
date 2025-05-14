import { Link } from "react-router";
import defaultProfile from "../assets/images/profile/profileDefault.jpeg";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { ArrowRight } from "iconoir-react";

const AdvertisementOwnerInfo = ({ id, owner }) => {
  // User table head
  const OWNER_TABLE_HEAD = ["User", "Email", "Address", "Phone Number"];
  return (
    <tr>
      <td colSpan={6} className="bg-gray-50">
        <div className="flex gap-4 justify-between items-center mt-5 mb-3 mx-2">
          <h4 className="font-semibold">Owner Information:</h4>
          <Button
            as={Link}
            to={`/rentals/${id}`}
            className="flex items-center gap-2"
            size="sm"
          >
            Advertisement details
            <ArrowRight strokeWidth={2} className="h-4 w-4" />{" "}
          </Button>
        </div>
        <div className="mt-2 w-full overflow-hidden rounded-lg border border-surface mb-10">
          <table className="w-full">
            <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
              <tr>
                {OWNER_TABLE_HEAD.map((head) => (
                  <th className="px-2.5 py-2 text-start font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="group text-sm text-black dark:text-white">
              <tr className="border-b border-surface last:border-0">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={owner.profile_image || defaultProfile}
                      alt="Profile Image"
                      size="sm"
                      className="bg-blue-900 object-contain"
                    />
                    <Typography type="small">{owner.name}</Typography>
                  </div>
                </td>
                <td className="p-3">
                  <Typography type="small" className="opacity-70">
                    {owner.email}
                  </Typography>
                </td>
                <td className="p-3">
                  <Typography type="small" className="opacity-70">
                    {owner.address || "Address didn't set"}
                  </Typography>
                </td>
                <td className="p-3">
                  <Typography type="small" className="opacity-70">
                    {owner.phone_number || "Phone number didn't set"}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

export default AdvertisementOwnerInfo;
