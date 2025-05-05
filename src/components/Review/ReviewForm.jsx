import { Button, Rating, Textarea } from "@material-tailwind/react";
const ReviewForm = () => {
  return (
    <div className="bg-[#F0F2F4] p-3 md:p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Add A Review</h2>
      <h3 className="text-xl flex items-center gap-10 my-6">
        <span>Rating:</span>{" "}
        <Rating
          value={2}
          color="warning"
          className="scale-125 cursor-pointer"
        />
      </h3>
      <Textarea
        rows={4}
        className="border-black"
        placeholder="Comment here..."
      />
      <Button className="w-full bg-green-600 px-8 mt-2 py-3 font-bold hover:bg-green-700 border-none">
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewForm;
