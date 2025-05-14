import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import { useState } from "react";
import authApiClient from "../../services/authApiClient";
import { handleApiError, handleSuccessMessage } from "../Messages/Alert";

const AddAdvertisementImages = ({ advertiseId }) => {
  const [imagePreview, setImagePreview] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // select files
  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview(() => files.map((file) => URL.createObjectURL(file)));
    setImages(files);
  };
  // drag and drop files
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImagePreview(() => files.map((file) => URL.createObjectURL(file)));
    setImages(files);
  };
  // prevent to open new tab
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // add images
  const handleAddImages = async () => {
    setLoading(true);
    try {
      let res;
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        res = await authApiClient.post(
          `/my_advertisements/${advertiseId}/images/`,
          formData
        );
      }
      if (res.status == 201) {
        handleSuccessMessage(
          "Images Added",
          "Your Images successfully added for this house advertisement."
        );
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
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
            Add house images
          </Typography>
        </Card.Header>
        <Card.Body>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="bg-gray-50 my-8 text-center px-4 rounded max-w-md flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
          >
            <div className="py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 mb-4 fill-slate-600 inline-block"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              <h4 className="text-base font-semibold text-slate-600">
                Drag and drop files here
              </h4>
            </div>

            <hr className="w-full border-gray-300 my-2" />

            <div className="py-6">
              <input
                type="file"
                id="uploadFile1"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleChangeImage}
              />
              <label
                htmlFor="uploadFile1"
                className="block px-6 py-2.5 rounded text-slate-600 text-sm tracking-wider font-semibold border-none outline-none cursor-pointer bg-gray-200 hover:bg-gray-100"
              >
                Browse Files
              </label>
              <p className="text-xs text-slate-500 mt-4">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
          </div>

          <div className="md:mx-10">
            <div className="flex gap-2 flex-wrap items-center my-6">
              {imagePreview.map((img, index) => (
                <img
                  key={index}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-md"
                  src={img}
                  alt="Advertisement Images"
                />
              ))}
            </div>
            <Button disabled={loading} onClick={handleAddImages} isFullWidth>
              {loading ? (
                <span className="flex items-center gap-3">
                  <Spinner size="sm" color="success" />
                  Uploading...
                </span>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddAdvertisementImages;
