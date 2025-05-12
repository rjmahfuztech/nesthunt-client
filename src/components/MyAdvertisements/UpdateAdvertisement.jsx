import { useForm } from "react-hook-form";
import authApiClient from "../../services/authApiClient";
import { handleApiError, Toast } from "../Messages/Alert";
import useFetchCategory from "../../hooks/useFetchCategory";
import AdvertisementForm from "./AdvertisementForm";
import { useEffect } from "react";

const UpdateAdvertisement = ({
  advertisement,
  setAdvertisement,
  setMyAdvertisements,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // set previous value
  useEffect(() => {
    Object.keys(advertisement).forEach((key) =>
      setValue(key, advertisement[key])
    );
  }, [advertisement, setValue]);

  const handleUpdateAdvertisement = async (data) => {
    try {
      const res = await authApiClient.put(
        `/my_advertisements/${advertisement.id}/`,
        data
      );
      if (res.status == 200) {
        await Toast.fire({
          icon: "success",
          html: `<span class="text-black font-bold">${data.title}</span> - advertisement successfully updated`,
        });
        // update the advertisement list state locally
        setMyAdvertisements((prevAdvertisements) =>
          prevAdvertisements.map((item) =>
            item.id === advertisement.id ? data : item
          )
        );
        // back to advertisement list
        setAdvertisement(null);
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  // load categories
  const { categories } = useFetchCategory();

  return (
    <>
      <AdvertisementForm
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        categories={categories}
        onSubmit={handleUpdateAdvertisement}
        setAdvertisement={setAdvertisement}
        isUpdating={true}
      />
    </>
  );
};

export default UpdateAdvertisement;
