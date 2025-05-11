import { Button, Rating, Spinner, Textarea } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className="bg-[#F0F2F4] p-3 md:p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Add A Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl flex items-center gap-10 mt-6 mb-2">
          <span>Rating:</span>{" "}
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            rules={{ validate: (value) => value > 0 || "Rating is required" }}
            render={({ field }) => (
              <Rating
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                color={`${errors.rating ? "error" : "warning"}`}
                className="scale-125 cursor-pointer"
              />
            )}
          />
        </h3>
        {errors.rating && (
          <p className="text-xs font-semibold text-red-500">
            {errors.rating.message}
          </p>
        )}
        <Textarea
          {...register("comment", {
            required: "Comment is required",
          })}
          rows={4}
          placeholder="Comment here..."
          color={`${errors.comment ? "error" : "primary"}`}
          className={`${
            errors.comment ? "border-red-500" : "border-black"
          } mt-2`}
        />
        {errors.comment && (
          <p className="text-xs font-semibold text-red-500">
            {errors.comment.message}
          </p>
        )}
        <Button
          disabled={isSubmitting}
          className="w-full bg-green-600 px-8 mt-2 py-3 font-bold hover:bg-green-700 border-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <Spinner size="sm" color="success" />
              Submitting...
            </span>
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
