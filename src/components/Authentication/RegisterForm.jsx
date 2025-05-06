import {
  Dialog,
  Button,
  Input,
  Typography,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const RegisterForm = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(!open);
    navigate("/");
  };
  return (
    <Dialog open={open} handler={handleClose} size="sm">
      <Dialog.Overlay className="bg-neutral-400">
        <Dialog.Content className="p-0">
          <Dialog.DismissTrigger
            as={IconButton}
            onClick={handleClose}
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-1 top-1"
            isCircular
          >
            <Xmark className="h-6 w-6" />
          </Dialog.DismissTrigger>
          <Card className="border-none mt-10">
            <Card.Header
              as={Card}
              color="primary"
              className="grid h-24 place-items-center shadow-none"
            >
              <Typography
                as="span"
                type="h4"
                className="text-primary-foreground"
              >
                Sign Up
              </Typography>
            </Card.Header>
            <Card.Body>
              <form action="">
                <div className="flex gap-2">
                  {/* First Name  */}
                  <div className="mb-2 mt-2 space-y-1.5 w-full">
                    <Typography
                      as="label"
                      htmlFor="first_name"
                      type="small"
                      color="default"
                      className="font-semibold"
                    >
                      First Name
                    </Typography>
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                  {/* Last Name  */}
                  <div className="mb-2 mt-2 space-y-1.5 w-full">
                    <Typography
                      as="label"
                      htmlFor="last_name"
                      type="small"
                      color="default"
                      className="font-semibold"
                    >
                      Last Name
                    </Typography>
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div className="mb-4 mt-2 space-y-1.5">
                  <Typography
                    as="label"
                    htmlFor="email"
                    type="small"
                    color="default"
                    className="font-semibold"
                  >
                    Email
                  </Typography>
                  <Input
                    id="email"
                    type="email"
                    placeholder="someone@example.com"
                  />
                </div>
                <div className="mb-4 space-y-1.5">
                  <Typography
                    as="label"
                    htmlFor="password"
                    type="small"
                    color="default"
                    className="font-semibold"
                  >
                    Password
                  </Typography>
                  <Input
                    id="password"
                    type="password"
                    placeholder="************"
                  />
                </div>
                <Button isFullWidth>Sign Up</Button>
              </form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Typography
                type="small"
                className="my-1 flex items-center justify-center gap-1 text-foreground"
              >
                Already have an account?
                <Typography
                  type="small"
                  as={Link}
                  to="/login"
                  color="primary"
                  className="font-bold hover:text-gray-600 transition-colors"
                >
                  Login
                </Typography>
              </Typography>
            </Card.Footer>
          </Card>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default RegisterForm;
