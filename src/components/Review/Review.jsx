import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import apiClient from "../../services/apiClient";
import reviewImg from "../../assets/images/rating.jpeg";
import ReviewList from "./ReviewList";
import authApiClient from "../../services/authApiClient";
import {
  handleApiError,
  handleSuccessMessage,
  handleDeleteWarning,
} from "../Messages/Alert";

const Review = ({ advertiseId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Get all reviews
  const advertisementReviews = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/advertisements/${advertiseId}/reviews/`
      );
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    advertisementReviews();
  }, []);

  // Add review
  const onSubmit = async (data) => {
    try {
      const res = await authApiClient.post(
        `/advertisements/${advertiseId}/reviews/`,
        data
      );
      if (res.status == 201) {
        handleSuccessMessage(
          "Review Submitted",
          "Your review has been successfully added for this house."
        );
        // reload reviews
        advertisementReviews();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Update review
  const handleUpdateReview = async (id, updateData) => {
    try {
      const res = await authApiClient.put(
        `/advertisements/${advertiseId}/reviews/${id}/`,
        updateData
      );
      if (res.status == 200) {
        handleSuccessMessage(
          "Review Updated",
          "Your review has been successfully updated."
        );
        // reset editingId
        setEditingId(null);
        // reload reviews
        advertisementReviews();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Delete review
  const handleDeleteReview = async (id) => {
    // delete success alert
    handleDeleteWarning().then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await authApiClient.delete(
            `/advertisements/${advertiseId}/reviews/${id}/`
          );
          if (res.status == 204) {
            // Update the local state
            setReviews((prevReviews) =>
              prevReviews.filter((review) => review.id !== id)
            );
            handleSuccessMessage(
              "Review Deleted",
              "Your review for this house advertisement has been deleted."
            );
          }
        } catch (error) {
          handleApiError(error);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex gap-2 justify-between">
        <h3 className="text-lg fon-semibold">Customer review</h3>
        <h3 className="text-lg fon-semibold">
          {reviews.length === 0 ? "" : reviews.length}{" "}
          {reviews.length === 0
            ? "No Review"
            : `${reviews.length == 1 ? "Review" : "Reviews"}`}
        </h3>
      </div>
      <hr className="-mx-3 my-2 border-secondary" />
      <ReviewForm onSubmit={onSubmit} />
      {reviews.length === 0 ? (
        <div className="my-6 text-center">
          <div className="flex justify-center">
            <img src={reviewImg} className="w-40" alt="Rating Image" />
          </div>
          <h2 className="font-bold text-2xl my-3">No Reviews Yet</h2>
          <p className="text-gray-500 font-semibold text-md text-lg">
            Be the first to review this house!
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center my-14 items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <ReviewList
          reviews={reviews}
          editingId={editingId}
          setEditingId={setEditingId}
          handleUpdateReview={handleUpdateReview}
          handleDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
};

export default Review;
