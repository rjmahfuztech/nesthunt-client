import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleChangePassword = (data) => {
    console.log(data);
  };
  return (
    <Card className="max-w-[45rem] mx-auto">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Change your Password
        </Typography>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          {/* Current Password  */}
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="current_password"
              type="small"
              color="default"
              className="font-semibold"
            >
              Current Password
            </Typography>
            <Input
              id="current_password"
              type="password"
              placeholder="************"
              {...register("current_password", {
                required: "Current password is required",
              })}
              color={`${errors.current_password ? "error" : "primary"}`}
              className={`${errors.current_password ? "border-red-500" : ""}`}
            />
            {errors.current_password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.current_password.message}
              </p>
            )}
          </div>
          {/* New Password  */}
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="new_password"
              type="small"
              color="default"
              className="font-semibold"
            >
              New Password
            </Typography>
            <Input
              id="new_password"
              type="password"
              placeholder="************"
              {...register("new_password", {
                required: "New password is required",
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "Password must be at least 8 characters long and include uppercase, lowercase, and a number",
                },
              })}
              color={`${errors.new_password ? "error" : "primary"}`}
              className={`${errors.new_password ? "border-red-500" : ""}`}
            />
            {errors.new_password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.new_password.message}
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
          <Button isFullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Changing...
              </span>
            ) : (
              "Change Password"
            )}
          </Button>
          {/* Profile button  */}
        </form>
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;
