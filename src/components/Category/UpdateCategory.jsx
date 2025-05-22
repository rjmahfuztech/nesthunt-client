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
import { useEffect } from "react";

const UpdateCategory = ({ category, setCategory, setCategories }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // set previous category value
  useEffect(() => {
    Object.keys(category).forEach((key) => setValue(key, category[key]));
  }, [category, setValue]);

  const handleUpdateCategory = async (data) => {
    try {
      const res = await authApiClient.put(`/categories/${category.id}/`, {
        name: data.name,
        description: data.description,
      });
      if (res.status == 200) {
        await Toast.fire({
          icon: "success",
          html: `<span class="text-black font-bold">${data.name}</span> - category successfully updated`,
        });
        // update the category list state locally
        setCategories((prevCategories) =>
          prevCategories.map((item) => (item.id === category.id ? data : item))
        );
        // back to category list
        setCategory(null);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Card className="max-w-[45rem] mx-auto p-3 md:p-4 shadow-lg">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Update Category
        </Typography>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
              htmlFor="name"
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
          <div className="flex gap-3 items-center justify-center mt-4">
            <Button
              disabled={isSubmitting}
              onClick={() => setCategory(null)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <Spinner size="sm" color="success" />
                  Updating...
                </span>
              ) : (
                "Update Category"
              )}
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default UpdateCategory;
