import { Card, Input, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import UpdateProfileButton from "./UpdateProfileButton";
import { Toast } from "../../Messages/Alert";
import UpdateProfileForm from "./UpdateProfileForm";
import defaultProfile from "../../../assets/images/profile/profileDefault.jpeg";

const UpdateProfile = () => {
  const { user, updateProfile, updateProfilePicture } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // set user data to input field
  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const handleUpdateProfile = async (data) => {
    try {
      const profilePayLoad = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };
      const res = await updateProfile(profilePayLoad);
      if (res.success) {
        await Toast.fire({
          icon: "success",
          title: "Your profile has been successfully updated",
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update profile picture
  const handleChangeProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await updateProfilePicture(file);
      if (res.success) {
        await Toast.fire({
          icon: "success",
          title: "Your profile picture has been successfully changed",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Card className="max-w-[45rem] mx-auto p-3 md:p-4 shadow-lg">
        <Card.Header
          as={Card}
          color="primary"
          className="grid min-h-24 max-h-36 place-items-center shadow-none"
        >
          <Typography as="span" type="h4" className="text-primary-foreground">
            Update your Profile
          </Typography>
        </Card.Header>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChangeProfilePic}
        />
        <img
          className={`w-24 bg-blue-950 md:w-32 h-24 md:h-32 rounded-full mx-auto ${
            user.profile_image ? "object-contain p-1 md:p-2" : "object-cover"
          } object-center cursor-pointer my-2 border`}
          src={user?.profile_image || defaultProfile}
          alt="Profile Picture"
          onClick={handleImageClick}
        />
        <Card.Body>
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            {/* Profile form  */}
            <UpdateProfileForm
              register={register}
              isEditing={isEditing}
              errors={errors}
            />
            {/* Profile button  */}
            <UpdateProfileButton
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isSubmitting={isSubmitting}
            />
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateProfile;
