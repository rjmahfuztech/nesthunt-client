import { useEffect, useState } from "react";
import authApiClient from "../../services/authApiClient";
import {
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  Button,
} from "@material-tailwind/react";
import { Trash, Xmark } from "iconoir-react";
import {
  handleApiError,
  handleConfirmationWarning,
  handleSuccessMessage,
} from "../Messages/Alert";
import AddAdvertisementImages from "./AddAdvertisementImages";

const AdvertisementImages = ({ advertiseId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApiClient
      .get(`/my_advertisements/${advertiseId}/images/`)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [advertiseId]);

  // delete image
  const deleteImage = (id) => {
    // delete warning
    handleConfirmationWarning("delete").then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(
            `/my_advertisements/${advertiseId}/images/${id}/`
          );
          if (res.status == 204) {
            // update the local state
            setImages((prevImages) =>
              prevImages.filter((item) => item.id !== id)
            );
            // success alert
            handleSuccessMessage(
              "Image Deleted",
              "Your Image has been successfully deleted."
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center h-72 items-center">
        <div className="loader"></div>
      </div>
    );
  return (
    <div>
      <div className="my-5 flex items-center justify-between">
        <Typography type="h6">Image list</Typography>
        {advertiseId && (
          <Dialog size="md">
            <Dialog.Trigger as={Button}>Add Image</Dialog.Trigger>
            <Dialog.Overlay>
              <Dialog.Content>
                <div className="my-8 md:my-20">
                  <AddAdvertisementImages advertiseId={advertiseId} />
                </div>
                <Dialog.DismissTrigger
                  as={IconButton}
                  size="sm"
                  variant="ghost"
                  isCircular
                  color="secondary"
                  className="absolute right-2 top-2"
                >
                  <Xmark className="h-7 w-7" />
                </Dialog.DismissTrigger>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog>
        )}
      </div>
      {images.length === 0 && (
        <h2 className="text-gray-500 text-lg font-semibold text-center my-14 md:my-20">
          No image found
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div className="bg-slate-200 rounded-md p-2 md:py-4" key={image.id}>
            <div className="flex gap-4 justify-around items-center">
              <div>
                <Dialog size="md">
                  <Dialog.Trigger as={Button} className="p-0 border-none">
                    <img
                      src={image.image}
                      className="w-16 h-16 object-cover rounded-md hover:shadow-lg"
                      alt="House Image"
                    />
                  </Dialog.Trigger>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <img
                        src={image.image}
                        className="w-full object-cover rounded-md"
                        alt="House Image"
                      />
                      <Dialog.DismissTrigger
                        as={IconButton}
                        size="sm"
                        variant="ghost"
                        isCircular
                        color="secondary"
                        className="absolute right-2 top-2"
                      >
                        <Xmark className="h-7 w-7" />
                      </Dialog.DismissTrigger>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog>
              </div>
              <Tooltip>
                <Tooltip.Trigger
                  as={IconButton}
                  onClick={() => deleteImage(image.id)}
                  variant="ghost"
                  color="secondary"
                >
                  <Trash className="h-5 w-5 text-red-500 dark:text-white" />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Delete Image
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementImages;
