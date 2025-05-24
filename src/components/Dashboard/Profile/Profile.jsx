import { Button, Card, Typography } from "@material-tailwind/react";
import useAuthContext from "../../../hooks/useAuthContext";
import {
  EditPencil,
  Mail,
  MapPin,
  NavArrowRightSolid,
  Phone,
  User,
} from "iconoir-react";
import defaultProfile from "../../../assets/images/profile/profileDefault.jpeg";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <Card className="max-w-[60rem] mx-auto shadow-lg">
      <div className="p-3 md:p-4">
        <Card.Header className="text-center bg-black p-4">
          <img
            className={`w-28 h-28 rounded-full mx-auto ${
              user.profile_image ? "object-contain p-1" : "object-cover"
            } bg-blue-950 object-center`}
            src={user?.profile_image || defaultProfile}
            alt="Profile Picture"
          />
        </Card.Header>
        <Card.Body className="md:p-8">
          <Typography className="mt-4 text-xl font-semibold">
            Profile Information:
          </Typography>
          <hr className="mt-2 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <User className="w-6 h-6 mt-1 text-gray-400" />
              <div>
                <Typography className="text-sm text-gray-400">Name</Typography>
                <Typography className="font-medium">
                  {user?.first_name} {user?.last_name}
                </Typography>
              </div>
            </div>
            <div className="flex gap-2">
              <Phone className="w-6 h-6 mt-1 text-gray-400" />
              <div>
                <Typography className="text-sm text-gray-400">Phone</Typography>
                <Typography className="font-medium">
                  {user?.phone_number ||
                    " 01****** Set phone number from update profile."}
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-2">
              <Mail className="w-6 h-6 mt-1 text-gray-400" />
              <div>
                <Typography className="text-sm text-gray-400">Email</Typography>
                <Typography className="font-medium">{user?.email}</Typography>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="w-6 h-6 mt-1 text-gray-400" />
              <div>
                <Typography className="text-sm text-gray-400">
                  Address
                </Typography>
                <Typography className="font-medium">
                  {user?.address || "Set your address from update profile."}
                </Typography>
              </div>
            </div>
          </div>
        </Card.Body>
      </div>
      <Card.Footer className="bg-[#F9FAFC] p-5 md:p-6 flex justify-end">
        <Link to="/dashboard/update-profile">
          <Button className="flex gap-1 items-center w-full md:w-80">
            <EditPencil /> Edit Profile
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default Profile;
