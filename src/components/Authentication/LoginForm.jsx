import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
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
                Sign In
              </Typography>
            </Card.Header>
            <Card.Body>
              <form action="">
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
                <label
                  htmlFor="remember"
                  className="mb-4 flex items-center gap-2"
                >
                  <Checkbox id="remember">
                    <Checkbox.Indicator />
                  </Checkbox>
                  <Typography className="text-foreground">
                    Remember Me
                  </Typography>
                </label>
                <Button isFullWidth>Sign In</Button>
              </form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Typography
                type="small"
                className="my-1 flex items-center justify-center gap-1 text-foreground"
              >
                Don't have an account?
                <Typography
                  type="small"
                  as={Link}
                  to="/sign-up"
                  color="primary"
                  className="font-bold hover:text-gray-600 transition-colors"
                >
                  Sign up
                </Typography>
              </Typography>
            </Card.Footer>
          </Card>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default LoginForm;
