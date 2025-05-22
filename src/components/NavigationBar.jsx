import React, { useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import defaultProfile from "../assets/images/profile/profileDefault.jpeg";
import logo from "../assets/logo/small.jpeg";

const NavList = () => {
  const navLinks = [
    // { title: "Home", to: "/" },
    { title: "Service", href: "#service" },
    { title: "Rentals", to: "/rentals" },
    { title: "Add Advertise", to: "/dashboard/advertisement/add" },
    { title: "Dashboard", to: "/dashboard" },
    { title: "About Us", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];
  return (
    <>
      {navLinks.map((nav, index) => (
        <li key={index}>
          <Typography
            as={nav?.to ? Link : "a"}
            to={nav?.to}
            href={nav?.href}
            type="small"
            className="flex items-center gap-x-2 font-semibold p-1"
          >
            {nav.title}
          </Typography>
        </li>
      ))}
    </>
  );
};

const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, handleLogOut } = useAuthContext();
  const [isScroll, setIsScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScrollNavbar = () => {
      setIsScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScrollNavbar);
    return () => window.removeEventListener("scroll", handleScrollNavbar);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <Navbar
      className={`${
        isScroll
          ? "bg-white text-black py-3"
          : `bg-transparent ${isHomePage && "text-white"} py-6`
      } border-none rounded-none w-full z-50 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-screen-2xl px-4 mx-auto">
        <Dialog size="xs">
          <div className="flex items-center">
            <Typography
              as={Link}
              to="/"
              type="small"
              className="max-w-40"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img className="w-28 rounded-md" src={logo} alt="Logo" />
            </Typography>
            <div className="hidden lg:ml-auto lg:block">
              <div className="flex gap-4">
                {/* Navbar list  */}
                <ul className="mt-4 flex flex-col gap-x-2 xl:gap-x-7 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
                  <li>
                    <Typography
                      as={Link}
                      to="/"
                      type="small"
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex items-center gap-x-2 font-semibold p-1"
                    >
                      Home
                    </Typography>
                  </li>
                  <NavList />
                </ul>
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
                        color="success"
                        className="hidden lg:inline-block px-5"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button
                        size="sm"
                        color="success"
                        className="hidden lg:inline-block px-5"
                      >
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
              variant={isScroll ? "ghost" : "solid"}
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
              {/* Navbar list  */}
              <ul className="mt-4 flex flex-col gap-x-7 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
                <li>
                  <Typography
                    as={Link}
                    to="/"
                    type="small"
                    onClick={() => window.scrollTo(0, 0)}
                    className="flex items-center gap-x-2 font-semibold p-1"
                  >
                    <Dialog.DismissTrigger>Home</Dialog.DismissTrigger>
                  </Typography>
                </li>
                <Dialog.DismissTrigger>
                  <NavList />
                </Dialog.DismissTrigger>
              </ul>
              {!user && (
                <>
                  <Link to="/login">
                    <Button
                      size="sm"
                      color="success"
                      variant="outline"
                      className="mt-4 w-full"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button
                      size="sm"
                      color="success"
                      className="mt-2 lg:mt-4 w-full"
                    >
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
