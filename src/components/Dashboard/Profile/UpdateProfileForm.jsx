import { Input, Tooltip, Typography } from "@material-tailwind/react";

const UpdateProfileForm = ({ register, isEditing, errors }) => {
  return (
    <>
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
          className="font-semibold block"
        >
          Email
        </Typography>
        <Tooltip>
          <Tooltip.Trigger type="button" className="w-full cursor-not-allowed">
            <Input
              id="email"
              type="email"
              disabled
              placeholder="someone@example.com"
              {...register("email")}
              color="primary"
            />
          </Tooltip.Trigger>
          <Tooltip.Content className="text-red-500">
            Email is not editable.
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip>
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
          disabled={!isEditing}
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
          disabled={!isEditing}
          placeholder="Your phone number"
          {...register("phone_number")}
          color="primary"
          className="!w-full placeholder:text-left !text-left !py-2 !hover:border-black !border-surface"
        />
      </div>
    </>
  );
};

export default UpdateProfileForm;
