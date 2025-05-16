import { Button, Dialog, Input, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const ModalForm = ({ advertiseId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(advertiseId);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      {/* Full Name  */}
      <div className="mb-2 mt-2 space-y-1.5 w-full">
        <Typography
          as="label"
          htmlFor="full_name"
          type="small"
          color="default"
          className="font-semibold"
        >
          Full Name
        </Typography>
        <Input
          id="full_name"
          type="text"
          placeholder="your name"
          {...register("full_name", {
            required: "Name is required",
          })}
          color={`${errors.full_name ? "error" : "primary"}`}
          className={`${errors.full_name ? "border-red-500" : ""}`}
        />
        {errors.full_name && (
          <p className="text-xs font-semibold text-red-500">
            {errors.full_name.message}
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
          placeholder="your address"
          {...register("address", {
            required: "Address is required",
          })}
          color={`${errors.address ? "error" : "primary"}`}
          className={`${errors.address ? "border-red-500" : ""}`}
        />
        {errors.address && (
          <p className="text-xs font-semibold text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>
      {/* Phone number */}
      <div className="mb-2 mt-2 space-y-1.5 w-full">
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
          type="text"
          placeholder="your phone number"
          {...register("phone_number", {
            required: "Phone number is required",
          })}
          color={`${errors.phone_number ? "error" : "primary"}`}
          className={`${errors.phone_number ? "border-red-500" : ""}`}
        />
        {errors.phone_number && (
          <p className="text-xs font-semibold text-red-500">
            {errors.phone_number.message}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Dialog.DismissTrigger
          className="w-full md:w-36"
          as={Button}
          color="secondary"
        >
          Cancel
        </Dialog.DismissTrigger>
        <Button className="w-full md:w-36">Submit</Button>
      </div>
    </form>
  );
};

export default ModalForm;
