import React from "react";
import {
  Button,
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Dialog,
} from "@material-tailwind/react";
import { Menu, Xmark } from "iconoir-react";

const NavList = () => {
  const LINKS = [
    { title: "Pages", href: "#" },
    { title: "Account", href: "#" },
    { title: "Blocks", href: "#" },
    { title: "Docs", href: "#" },
  ];
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }) => (
        <li key={title}>
          <Typography
            as="a"
            href={href}
            type="small"
            className="flex items-center gap-x-2 p-1 hover:text-primary"
          >
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <Navbar className="py-4 rounded-none w-full ">
      <div className="max-w-screen-2xl mx-auto">
        <Dialog size="xs">
          <div className="flex items-center text-gray-500">
            <Typography
              as="a"
              href="#"
              type="small"
              className="ml-2 mr-2 block py-1 text-lg font-semibold"
            >
              NestHunt
            </Typography>
            <div className="hidden lg:ml-auto lg:block">
              <div className="flex gap-4">
                <NavList />
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden lg:inline-block"
                >
                  Sign In
                </Button>
                <Button size="sm" className="hidden lg:inline-block ">
                  Sign Up
                </Button>
              </div>
            </div>
            <IconButton
              size="sm"
              variant="ghost"
              color="secondary"
              onClick={() => setOpenNav(!openNav)}
              className="ml-auto grid lg:hidden"
            >
              <Dialog.Trigger>
                <Menu className="h-6 w-6" />
              </Dialog.Trigger>
            </IconButton>
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
              <NavList />
              <Button size="sm" variant="outline" className="mt-4 w-full">
                Sign In
              </Button>
              <Button size="sm" className="mt-2 lg:mt-4 w-full bg-orange-500">
                Sign Up
              </Button>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
