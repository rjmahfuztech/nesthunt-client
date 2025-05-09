import { Card, Typography } from "@material-tailwind/react";
import useAuthContext from "../../../hooks/useAuthContext";
import { NavArrowRightSolid } from "iconoir-react";
import defaultProfile from "../../../assets/images/profile/profileDefault.jpeg";

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <Card className="max-w-md mx-auto">
      <Card.Header className="mx-3 mt-3 text-center">
        <img
          className={`w-28 h-28 rounded-full mx-auto ${
            user.profile_image ? "object-contain p-1" : "object-cover"
          } bg-blue-950 object-center`}
          src={user?.profile_image || defaultProfile}
          alt="Profile Picture"
        />
        <Typography type="h5" className="mt-2">
          {user?.first_name} {user?.last_name}
        </Typography>
      </Card.Header>

      <Card.Body className="ml-2">
        <Typography className="my-1 text-xl font-semibold">
          Profile Information:
        </Typography>
        <Typography className="font-semibold mt-2">Email:</Typography>
        <Typography className="flex gap-1 items-center">
          <NavArrowRightSolid /> {user?.email}
        </Typography>
        <Typography className="font-semibold mt-2">Address:</Typography>
        <Typography className="flex gap-1 items-center">
          <NavArrowRightSolid />{" "}
          {user?.address || "Set your address from update profile."}
        </Typography>
        <Typography className="font-semibold mt-2">Phone Number:</Typography>
        <Typography className="flex gap-1 items-center">
          <NavArrowRightSolid />{" "}
          {user?.phone_number ||
            " 01****** Set phone number from update profile."}
        </Typography>
      </Card.Body>
    </Card>
  );
};

export default Profile;
