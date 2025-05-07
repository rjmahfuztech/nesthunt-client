import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { CheckCircle, XmarkCircle } from "iconoir-react";
import { Link } from "react-router";

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
  return (
    <Card className="border-none mt-10">
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
          <p className="my-2 text-sm font-semibold text-red-500 bg-red-200 rounded-lg p-3 flex gap-2 items-center">
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
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Card.Body>
      <Card.Footer className="text-center">
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
