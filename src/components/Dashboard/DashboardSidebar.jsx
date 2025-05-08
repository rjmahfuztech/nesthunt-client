import { useState } from "react";
import { Card, List, Typography, Collapse } from "@material-tailwind/react";
import {
  LogOut,
  NavArrowRight,
  Settings,
  UserCircle,
  Dashboard,
  GridPlus,
  PlusSquare,
  Megaphone,
  PlusCircle,
  Heart,
  Cube,
  SelectEdge3d,
  RedoCircle,
} from "iconoir-react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const DashboardSidebar = () => {
  const { handleLogOut, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  // admin menu
  const adminMenus = [
    { icon: Dashboard, title: "Dashboard", to: "/dashboard" },
    { icon: GridPlus, title: "Categories", to: "/dashboard/categories" },
    {
      icon: PlusSquare,
      title: "Add Category",
      to: "/dashboard/category/add",
    },
    {
      icon: Megaphone,
      title: "Advertisements",
      to: "/dashboard/advertisements",
    },
    {
      icon: Cube,
      title: "My Advertisements",
      to: "/dashboard/my-advertisements",
    },
    {
      icon: PlusCircle,
      title: "Add Advertisement",
      to: "/dashboard/advertisement/add",
    },
    {
      icon: SelectEdge3d,
      title: "Rent Requests",
      to: "/dashboard/rent-requests",
    },
    { icon: Heart, title: "Favorites", to: "/dashboard/favorites" },
  ];
  // user menu
  const userMenus = [
    {
      icon: Cube,
      title: "My Advertisements",
      to: "/dashboard/my-advertisements",
    },
    {
      icon: PlusCircle,
      title: "Add Advertisement",
      to: "/dashboard/advertisement/add",
    },
    {
      icon: SelectEdge3d,
      title: "Rent Requests",
      to: "/dashboard/rent-requests",
    },
    { icon: Heart, title: "Favorites", to: "/dashboard/favorites" },
  ];

  const navMenus = user.is_staff ? adminMenus : userMenus;

  return (
    <>
      <Card className="grid h-full border rounded-none bg-[#F8F8F8]">
        <div>
          <Card.Header className="mx-3 mb-0 mt-3 flex h-max items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/logo.png"
              alt="brand"
              className="h-7 w-7 rounded-full"
            />
            <Typography className="font-semibold text-xl">Dashboard</Typography>
          </Card.Header>
          <Card.Body className="p-3">
            <List className="mt-3">
              <hr className="-mx-3 my-3 border-secondary" />
              <List.Item
                as={Link}
                to="/dashboard/profile"
                onClick={() => setIsOpen((cur) => !cur)}
              >
                <List.ItemStart>
                  <UserCircle className="h-[18px] w-[18px]" />
                </List.ItemStart>
                Profile
                <List.ItemEnd>
                  <NavArrowRight
                    className={`h-4 w-4 ${isOpen ? "rotate-90" : ""}`}
                  />
                </List.ItemEnd>
              </List.Item>
              <Collapse open={isOpen}>
                <List>
                  <List.Item as={Link} to="/dashboard/update-profile">
                    <List.ItemStart>
                      <Settings className="h-[18px] w-[18px]" />
                    </List.ItemStart>
                    Update Profile
                  </List.Item>
                  <List.Item as={Link} to="/dashboard/change-password">
                    <List.ItemStart>
                      <Settings className="h-[18px] w-[18px]" />
                    </List.ItemStart>
                    Change Password
                  </List.Item>
                </List>
              </Collapse>
              <hr className="-mx-3 my-3 border-secondary" />
              {/* eslint-disable-next-line no-unused-vars */}
              {navMenus.map(({ icon: Icon, title, to }) => (
                <List.Item as={Link} key={title} to={to}>
                  <List.ItemStart>
                    <Icon className="h-[18px] w-[18px]" />
                  </List.ItemStart>
                  {title}
                </List.Item>
              ))}
              <hr className="-mx-3 my-3 border-secondary" />
              <List.Item
                onClick={handleLogOut}
                className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error"
              >
                <List.ItemStart>
                  <LogOut className="h-[18px] w-[18px]" />
                </List.ItemStart>
                Logout
              </List.Item>
              <List.Item
                as={Link}
                to="/"
                className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error"
              >
                <List.ItemStart>
                  <RedoCircle className="h-[18px] w-[18px]" />
                </List.ItemStart>
                Back Home
              </List.Item>
            </List>
          </Card.Body>
        </div>
        <Card.Footer className="mt-8 grid">
          <Typography type="small" className="mt-auto">
            @copywrite all write reserved.
          </Typography>
        </Card.Footer>
      </Card>
    </>
  );
};

export default DashboardSidebar;
