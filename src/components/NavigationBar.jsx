import React from "react";
import {
  Button,
  IconButton,
  Typography,
  Navbar,
  Dialog,
  Avatar,
  Menu,
} from "@material-tailwind/react";
import { LogOut, MenuScale, UserCircle, Xmark } from "iconoir-react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import defaultProfile from "../assets/images/profile/profileDefault.jpeg";

const NavList = () => {
  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Service", href: "#service" },
    { title: "Rent Catalog", to: "/rent-catalog" },
    { title: "Submit Advertise", to: "/submit-advertise" },
    { title: "Dashboard", to: "/dashboard" },
    { title: "About Us", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {navLinks.map((nav, index) => (
        <li key={index}>
          <Typography
            as={nav?.to ? Link : "a"}
            to={nav?.to}
            href={nav?.href}
            type="small"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            {nav.title}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, handleLogOut } = useAuthContext();

  return (
    <Navbar className="py-4 rounded-none w-full ">
      <div className="max-w-screen-2xl mx-auto">
        <Dialog size="xs">
          <div className="flex items-center text-gray-500">
            <Typography
              as={Link}
              to="/"
              type="small"
              className="ml-2 mr-2 block py-1 text-lg md:text-xl text-black font-semibold"
            >
              NestHunt
            </Typography>
            <div className="hidden lg:ml-auto lg:block">
              <div className="flex gap-4">
                <NavList />
                {user ? (
                  <Menu>
                    <Menu.Trigger
                      as={Avatar}
                      alt="profile-picture"
                      src={user?.profile_image || defaultProfile}
                      className={`${
                        user.profile_image
                          ? "object-contain p-1"
                          : "object-cover"
                      } bg-blue-950 object-center cursor-pointer`}
                    />
                    <Menu.Content className="z-[9999]">
                      <Menu.Item as={Link} to="/dashboard/profile">
                        <UserCircle className="mr-2 h-[18px] w-[18px]" /> My
                        Profile
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
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hidden lg:inline-block"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button size="sm" className="hidden lg:inline-block ">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <Dialog.Trigger
              as={Button}
              size="sm"
              variant="ghost"
              color="secondary"
              onClick={() => setOpenNav(!openNav)}
              className="ml-auto grid lg:hidden"
            >
              <MenuScale className="h-6 w-6" />
            </Dialog.Trigger>
          </div>
          <Dialog.Overlay className="lg:hidden">
            <Dialog.Content className="!w-72 sm:!w-96 top-52 sm:left-2/3">
              <Dialog.DismissTrigger
                as={IconButton}
                size="sm"
                variant="ghost"
                color="secondary"
                className="absolute right-2 top-2"
                isCircular
              >
                <Xmark
                  onClick={() => setOpenNav(!openNav)}
                  className="h-5 w-5"
                />
              </Dialog.DismissTrigger>
              {user && (
                <Menu>
                  <div className="flex justify-center">
                    <Menu.Trigger
                      as={Avatar}
                      alt="profile-picture"
                      src={user?.profile_image || defaultProfile}
                      className={`${
                        user.profile_image
                          ? "object-contain p-1"
                          : "object-cover"
                      } bg-blue-950 object-center cursor-pointer`}
                    />
                  </div>
                  <Menu.Content className="z-[9999]">
                    <Menu.Item as={Link} to="/dashboard/profile">
                      <UserCircle className="mr-2 h-[18px] w-[18px]" /> My
                      Profile
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
              )}
              <hr className="!my-1 -mx-1 border-surface" />
              <NavList />
              {!user && (
                <>
                  <Link to="/login">
                    <Button size="sm" variant="outline" className="mt-4 w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button size="sm" className="mt-2 lg:mt-4 w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
