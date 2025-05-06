import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { resetPassword } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (email) => {
    setLoading(true);
    try {
      const res = await resetPassword(email);
      // success message and redirect to home
      if (res.success) {
        Swal.fire({
          title: "Check your mail",
          text: `${res.message}`,
          icon: "success",
          allowOutsideClick: false,
          confirmButtonText: "Back to home",
        }).then((result) => {
          if (result.isConfirmed) navigate("/");
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
            Forgot Password?
          </Typography>
          <Typography
            as="span"
            type="small"
            className="text-primary-foreground -mt-5"
          >
            Enter your email to reset password
          </Typography>
        </Card.Header>
        <Card.Body onSubmit={handleSubmit(onSubmit)} as="form">
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
          <Button disabled={loading} isFullWidth>
            {loading ? "Sending..." : "Next"}
          </Button>
        </Card.Body>
        <Card.Footer className="text-center">
          <Typography
            type="small"
            className="my-1 flex items-center justify-center gap-1 text-foreground"
          >
            Remember your password?
            <Typography
              type="small"
              as={Link}
              to="/login"
              color="primary"
              className="font-bold hover:text-gray-600 transition-colors underline"
            >
              Try to login
            </Typography>
          </Typography>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ResetPassword;
