import { useForm } from "react-hook-form";
import StarRating from "./StarRating";
import { Button, Spinner, Textarea } from "@material-tailwind/react";
import { useEffect } from "react";

const UpdateReviewForm = ({ review, handleUpdateReview, setEditingId }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Set review previous value
  useEffect(() => {
    Object.keys(review).forEach((key) => setValue(key, review[key]));
  }, [review, setValue]);

  const onSubmit = async (data) => {
    try {
      const reviewPayload = {
        rating: data.rating,
        comment: data.comment,
      };
      await handleUpdateReview(data.id, reviewPayload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#F0F2F4] p-3 md:p-4 rounded-lg">
      <hr className="-mx-3 my-2 border-secondary" />
      <h2 className="text-xl font-bold">Update Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Star Rating  */}
        <StarRating control={control} errors={errors} />
        {/* Comment  */}
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
        <div className="flex gap-2 items-center">
          <Button
            disabled={isSubmitting}
            className="w-full bg-green-600 px-8 mt-2 py-2 font-bold hover:bg-green-700 border-green-600 hover:border-green-700"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Spinner size="sm" color="success" />
                Updating...
              </span>
            ) : (
              "Update Review"
            )}
          </Button>
          <Button
            className="w-full px-8 mt-2 py-2 font-bold hover:bg-red-500 border-red-500 text-red-500"
            variant="outline"
            onClick={() => setEditingId(null)}
          >
            Cancel Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
