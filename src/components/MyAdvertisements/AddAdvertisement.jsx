import {
  Button,
  Card,
  Input,
  Select,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import authApiClient from "../../services/authApiClient";
import { handleApiError, Toast } from "../Messages/Alert";
import useFetchCategory from "../../hooks/useFetchCategory";
import AdvertisementForm from "./AdvertisementForm";

const AddAdvertisement = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { categories } = useFetchCategory();

  const handleAddAdvertisement = async (data) => {
    try {
      const res = await authApiClient.post("/advertisements/", data);
      if (res.status == 201) {
        await Toast.fire({
          icon: "success",
          html: `<span class="text-black font-bold">${data.title}</span> - advertisement successfully added`,
        });
      }
    } catch (error) {
      handleApiError(error);
    }

    // clear input field
    reset();
  };

  return (
    <AdvertisementForm
      categories={categories}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleAddAdvertisement}
      isUpdating={false}
    />
  );
};

export default AddAdvertisement;
