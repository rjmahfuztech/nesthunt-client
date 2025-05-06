import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

const ResetPasswordConfirm = () => {
  const { resetPasswordConfirm } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await resetPasswordConfirm(uid, token, data.new_password);
      // success message and redirect to login
      if (res.success) {
        Swal.fire({
          title: "Password Reseated",
          text: `${res.message}`,
          icon: "success",
          allowOutsideClick: false,
          confirmButtonText: "Login now",
          customClass: {
            confirmButton:
              "bg-black text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-md",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) navigate("/login");
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-200 py-20 md:py-32 px-4 h-screen">
      <Card className="max-w-sm mx-auto shadow-lg border-2">
        <Card.Header
          as={Card}
          color="primary"
          className="grid h-24 place-items-center shadow-none"
        >
          <Typography as="span" type="h5" className="text-primary-foreground">
            Reset Your Password
          </Typography>
          <Typography
            as="span"
            type="small"
            className="text-primary-foreground -mt-5"
          >
            Enter new password to reset
          </Typography>
        </Card.Header>
        <Card.Body onSubmit={handleSubmit(onSubmit)} as="form">
          {/* Password  */}
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
                required: "Password is required",
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
                  value === watch("new_password") || "Password do not match",
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
            {loading ? "Resetting..." : "Reset now"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPasswordConfirm;
