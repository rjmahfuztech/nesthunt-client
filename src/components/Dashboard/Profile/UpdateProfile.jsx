import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";

const UpdateProfile = () => {
  const { user } = useAuthContext();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // set user data to input field
  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const handleChangeProfile = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Card className="max-w-[45rem] mx-auto">
        <Card.Header
          as={Card}
          color="primary"
          className="grid min-h-24 max-h-36 place-items-center shadow-none"
        >
          <Typography as="span" type="h4" className="text-primary-foreground">
            Update your Profile
          </Typography>
        </Card.Header>
        <img
          className="w-24 md:w-32 h-24 md:h-32 rounded-full mx-auto cursor-pointer my-2"
          src={user.profile_image}
          alt="Profile Picture"
        />
        <Card.Body>
          <form onSubmit={handleSubmit(handleChangeProfile)}>
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
            {/* Address */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="address"
                type="small"
                color="default"
                className="font-semibold"
              >
                Address
              </Typography>
              <Input
                id="address"
                type="text"
                placeholder="Your address"
                {...register("address")}
                color="primary"
              />
            </div>
            {/* Phone number */}
            <div className="mb-2 mt-4 space-y-1.5w-full">
              <Typography
                as="label"
                htmlFor="phone_number"
                type="small"
                color="default"
                className="font-semibold"
              >
                Phone Number
              </Typography>
              <Input
                id="phone_number"
                type="number"
                placeholder="Your phone number"
                {...register("phone_number")}
                color="primary"
                className="!w-full placeholder:text-left !text-left !py-2 !hover:border-black !border-surface"
              />
            </div>
            <Button className="mt-2" isFullWidth>
              Submit
            </Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
