import {
  Button,
  Card,
  Input,
  Select,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Controller } from "react-hook-form";

const AdvertisementForm = ({
  categories,
  register,
  handleSubmit,
  control,
  errors,
  isSubmitting,
  onSubmit,
  isUpdating,
  setAdvertisement,
}) => {
  return (
    <Card className="max-w-[45rem] mx-auto p-3 md:p-4 shadow-lg">
      <Card.Header
        as={Card}
        color="primary"
        className="grid min-h-24 max-h-36 place-items-center shadow-none"
      >
        <Typography as="span" type="h4" className="text-primary-foreground">
          Add Advertisement
        </Typography>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            {/* title */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="title"
                type="small"
                color="default"
                className="font-semibold"
              >
                Title
              </Typography>
              <Input
                id="title"
                type="text"
                placeholder="Title..."
                {...register("title", {
                  required: "Title is required",
                })}
                color={`${errors.title ? "error" : "primary"}`}
                className={`${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* location */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="location"
                type="small"
                color="default"
                className="font-semibold"
              >
                Location
              </Typography>
              <Input
                id="location"
                type="text"
                placeholder="Location..."
                {...register("location", {
                  required: "Location is required",
                })}
                color={`${errors.location ? "error" : "primary"}`}
                className={`${errors.location ? "border-red-500" : ""}`}
              />
              {errors.location && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {/* rental amount */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="rental_amount"
                type="small"
                color="default"
                className="font-semibold"
              >
                Rent Amount
              </Typography>
              <Input
                id="rental_amount"
                type="text"
                placeholder="$XXXXXXX..."
                {...register("rental_amount", {
                  required: "Rent amount is required",
                })}
                color={`${errors.rental_amount ? "error" : "primary"}`}
                className={`${errors.rental_amount ? "border-red-500" : ""}`}
              />
              {errors.rental_amount && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.rental_amount.message}
                </p>
              )}
            </div>
            {/* apartment size */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="apartment_size"
                type="small"
                color="default"
                className="font-semibold"
              >
                Apartment Size
              </Typography>
              <Input
                id="apartment_size"
                type="text"
                placeholder="00000... square fit"
                {...register("apartment_size", {
                  required: "Apartment size is required",
                })}
                color={`${errors.apartment_size ? "error" : "primary"}`}
                className={`${errors.apartment_size ? "border-red-500" : ""}`}
              />
              {errors.apartment_size && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.apartment_size.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {/* bedroom */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="bedroom"
                type="small"
                color="default"
                className="font-semibold"
              >
                Bedroom
              </Typography>
              <Input
                id="bedroom"
                type="text"
                placeholder="bedroom..."
                {...register("bedroom", {
                  required: "Bedroom is required",
                })}
                color={`${errors.bedroom ? "error" : "primary"}`}
                className={`${errors.bedroom ? "border-red-500" : ""}`}
              />
              {errors.bedroom && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.bedroom.message}
                </p>
              )}
            </div>
            {/* bathroom */}
            <div className="mb-2 mt-2 space-y-1.5 w-full">
              <Typography
                as="label"
                htmlFor="bathroom"
                type="small"
                color="default"
                className="font-semibold"
              >
                Bathroom
              </Typography>
              <Input
                id="bathroom"
                type="text"
                placeholder="Bathroom..."
                {...register("bathroom", {
                  required: "Bathroom is required",
                })}
                color={`${errors.bathroom ? "error" : "primary"}`}
                className={`${errors.bathroom ? "border-red-500" : ""}`}
              />
              {errors.bathroom && (
                <p className="text-xs font-semibold text-red-500">
                  {errors.bathroom.message}
                </p>
              )}
            </div>
          </div>
          {/* category  */}
          <div className="mb-2 mt-2 space-y-1.5 w-full">
            <Typography
              as="label"
              htmlFor="category"
              type="small"
              color="default"
              className="font-semibold"
            >
              Category
            </Typography>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field }) => (
                <Select
                  key={field.value}
                  onValueChange={(val) => field.onChange(val)}
                  id="category"
                  color={`${errors.category ? "error" : "primary"}`}
                >
                  <Select.Trigger
                    placeholder="Choose Category"
                    className={`${errors.category && "border-red-500"} w-full`}
                  />
                  <Select.List>
                    <Select.Option className="border-b" value="">
                      Default
                    </Select.Option>
                    {categories.map((category) => (
                      <Select.Option
                        className="border-b"
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select.List>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-xs font-semibold text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
          {/* description  */}
          <div className="mb-2 mt-2 space-y-1.5 w-full">
            <Typography
              as="label"
              htmlFor="description"
              type="small"
              color="default"
              className="font-semibold"
            >
              Description
            </Typography>
            <Textarea
              id="description"
              type="text"
              placeholder="Description..."
              {...register("description", {
                required: "Description is required",
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
          {isUpdating ? (
            <div className="flex gap-3 items-center justify-center mt-4">
              <Button
                disabled={isSubmitting}
                onClick={() => setAdvertisement(null)}
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
                  "Update Advertisement"
                )}
              </Button>
            </div>
          ) : (
            <Button isFullWidth disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <Spinner size="sm" color="success" />
                  Adding...
                </span>
              ) : (
                "Add Advertisement"
              )}
            </Button>
          )}
        </form>
      </Card.Body>
    </Card>
  );
};

export default AdvertisementForm;
