import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews,
  handleUpdateReview,
  editingId,
  setEditingId,
}) => {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          isEditing={review.id == editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
        />
      ))}
    </>
  );
};

export default ReviewList;
