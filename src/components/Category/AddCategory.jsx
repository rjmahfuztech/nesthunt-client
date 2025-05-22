import {
  Button,
  Card,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import authApiClient from "../../services/authApiClient";
import { handleApiError, Toast } from "../Messages/Alert";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleAddCategory = async (data) => {
    try {
      const res = await authApiClient.post("/categories/", data);
      if (res.status == 201) {
        await Toast.fire({
          icon: "success",
          html: `<span class="text-black font-bold">${data.name}</span> - category successfully added`,
        });
      }
    } catch (error) {
      handleApiError(error);
    }

    // clear input field
    reset();
  };
  return (
    <Card className="max-w-[45rem] mx-auto p-3 md:p-4 shadow-lg">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Add Category
        </Typography>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          {/* category name  */}
          <div className="mb-2 mt-2 space-y-1.5 w-full">
            <Typography
              as="label"
              htmlFor="name"
              type="small"
              color="default"
              className="font-semibold"
            >
              Category Name
            </Typography>
            <Input
              id="name"
              type="text"
              placeholder="Category name"
              {...register("name", { required: "Category name is required" })}
              color={`${errors.name ? "error" : "primary"}`}
              className={`${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          {/* category description  */}
          <div className="mb-2 mt-2 space-y-1.5 w-full">
            <Typography
              as="label"
              htmlFor="description"
              type="small"
              color="default"
              className="font-semibold"
            >
              Category Description
            </Typography>
            <Textarea
              id="description"
              type="text"
              placeholder="Category description"
              {...register("description", {
                required: "Category description is required",
              })}
              color={`${errors.description ? "error" : "primary"}`}
              className={`${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-xs font-semibold text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <Button isFullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Adding...
              </span>
            ) : (
              "Add Category"
            )}
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default AddCategory;
