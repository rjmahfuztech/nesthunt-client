import {
  Button,
  Input,
  Typography,
  Card,
  Spinner,
} from "@material-tailwind/react";
import { CheckCircle, XmarkCircle } from "iconoir-react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const RegisterForm = ({
  handleSubmit,
  register,
  watch,
  errors,
  onSubmit,
  errorMessage,
  successMsg,
  loading,
  resendEmail,
  handleResendEmail,
  sending,
}) => {
  const { handleGoogleLogin } = useAuthContext();
  return (
    <Card className="border-none shadow-none mt-10">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Sign Up
        </Typography>
        {/* Show error if registration not success  */}
        {errorMessage && (
          <p className="my-2 text-sm font-semibold text-red-500 bg-red-200 rounded-lg p-3 flex flex-wrap sm:gap-2 items-center mx-2">
            <span className="flex gap-2 items-center">
              <XmarkCircle /> Failed!
            </span>
            <span>{errorMessage}</span>
          </p>
        )}
        {/* Show success message if registration success  */}
        {successMsg && (
          <p className="my-2 text-sm font-semibold text-green-500 bg-green-200 rounded-lg p-3 flex gap-2 items-center">
            <span>
              <CheckCircle />
            </span>
            <span>{successMsg}</span>
          </p>
        )}
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("first_name", {
                  required: "First name is required",
                })}
                color={`${errors.first_name ? "error" : "primary"}`}
                className={`${errors.first_name ? "border-red-500" : ""}`}
              />
              {errors.first_name && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.first_name.message}
                </p>
              )}
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
                placeholder="Last name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                color={`${errors.last_name ? "error" : "primary"}`}
                className={`${errors.last_name ? "border-red-500" : ""}`}
              />
              {errors.last_name && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          {/* Email  */}
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
              {...register("email", {
                required: "Email is required",
              })}
              color={`${errors.email ? "error" : "primary"}`}
              className={`${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-xs font-semibold text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password  */}
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
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
                },
              })}
              color={`${errors.password ? "error" : "primary"}`}
              className={`${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm password  */}
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="confirm_password"
              type="small"
              color="default"
              className="font-semibold"
            >
              Confirm Password
            </Typography>
            <Input
              id="confirm_password"
              type="password"
              placeholder="************"
              {...register("confirm_password", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === watch("password") || "Password do not match",
              })}
              color={`${errors.confirm_password ? "error" : "primary"}`}
              className={`${errors.confirm_password ? "border-red-500" : ""}`}
            />
            {errors.confirm_password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <Button disabled={loading} isFullWidth>
            {loading ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button
          size="sm"
          isFullWidth
          variant="outline"
          onClick={handleGoogleLogin}
          className="flex items-center gap-1 p-1 mb-3 -mt-2"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </div>
          <span>Continue with google</span>
        </Button>
        {resendEmail && (
          <Typography
            type="small"
            className="my-1 flex items-center justify-center gap-1 text-foreground mb-3"
          >
            Didn't get mail?
            <button
              onClick={handleResendEmail}
              disabled={loading}
              // type="small"
              color="primary"
              className={`font-bold hover:text-gray-600 transition-colors ${
                sending
                  ? "cursor-not-allowed text-gray-500"
                  : "cursor-pointer underline"
              }`}
            >
              {loading ? "Resending..." : "Resend email"}
            </button>
          </Typography>
        )}
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
            className="font-bold hover:text-gray-600 transition-colors underline"
          >
            Login
          </Typography>
        </Typography>
      </Card.Footer>
    </Card>
  );
};

export default RegisterForm;
