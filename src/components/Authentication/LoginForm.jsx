import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { XmarkCircle } from "iconoir-react";
import { Link } from "react-router";

const LoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  errorMessage,
  loading,
}) => {
  return (
    <Card className="border-none shadow-none mt-10">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Login
        </Typography>
        {/* Show error if login not success  */}
        {errorMessage && (
          <p className="my-2 text-sm font-semibold text-red-500 bg-red-200 rounded-lg p-3 flex gap-2 items-center">
            <span className="flex gap-2 items-center">
              <XmarkCircle /> Failed!
            </span>
            <span>{errorMessage}</span>
          </p>
        )}
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email", { required: "Enter a valid email" })}
              id="email"
              type="email"
              placeholder="someone@example.com"
              color={`${errors.email ? "error" : "primary"}`}
              className={`${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-xs font-semibold text-red-500">
                {errors.email.message}
              </p>
            )}
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
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              type="password"
              placeholder="************"
              color={`${errors.password ? "error" : "primary"}`}
              className={`${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Typography
              as={Link}
              to="/reset-password"
              className="text-foreground ml-2 hover:text-black transition-colors cursor-pointer underline"
            >
              Forgot Password?
            </Typography>
          </div>
          <Button disabled={loading} isFullWidth>
            {loading ? "Logging In..." : "Login"}
          </Button>
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
            className="font-bold hover:text-gray-600 transition-colors underline"
          >
            Sign up
          </Typography>
        </Typography>
      </Card.Footer>
    </Card>
  );
};

export default LoginForm;
