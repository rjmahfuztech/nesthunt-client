import { Rating } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

const StarRating = ({ control, errors }) => {
  return (
    <div>
      <h3 className="text-xl flex items-center gap-10 mt-4 mb-2">
        <span>Rating:</span>{" "}
        <Controller
          name="rating"
          control={control}
          defaultValue={0}
          rules={{ validate: (value) => value > 0 || "Rating is required" }}
          render={({ field }) => (
            <Rating
              key={field.value}
              value={field.value || 0}
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
    </div>
  );
};

export default StarRating;
