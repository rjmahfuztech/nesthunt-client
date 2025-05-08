import React from "react";
import { Typography, Navbar, Avatar, Menu } from "@material-tailwind/react";
import { UserCircle, Settings, LogOut, Xmark, MenuScale } from "iconoir-react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const DashboardNavbar = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { handleLogOut, user } = useAuthContext();
  return (
    <div>
      <Navbar className="rounded-none shadow-none">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <button
              className="text-black p-1 rounded-sm lg:hidden"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? (
                <Xmark className=" h-6 w-6 stroke-2" />
              ) : (
                <MenuScale className="h-6 w-6 stroke-2" />
              )}
            </button>
            <Typography
              as={Link}
              to="/"
              type="small"
              className="mx-2 block py-1 font-semibold text-xl"
            >
              NestHunt
            </Typography>
          </div>
          <div className="ml-auto">
            <Menu>
              <Menu.Trigger
                as={Avatar}
                alt="profile-picture"
                src={user?.profile_image}
                className="cursor-pointer"
              />
              <Menu.Content>
                <Menu.Item as={Link} to="/dashboard/profile">
                  <UserCircle className="mr-2 h-[18px] w-[18px]" /> My Profile
                </Menu.Item>
                <hr className="!my-1 -mx-1 border-surface" />
                <Menu.Item
                  onClick={handleLogOut}
                  className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error dark:hover:text-error dark:focus:text-error"
                >
                  <LogOut className="mr-2 h-[18px] w-[18px]" />
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default DashboardNavbar;
