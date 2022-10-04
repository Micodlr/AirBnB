import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllreviews } from "../../store/reviews";
// import { getAllSpots } from "../../store/spots";

export default function GetSpotReviews({ spotId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllreviews(spotId));
    // getAllSpots();
  }, [dispatch, spotId]);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  return (
    <div>
      <h3>Reviews</h3>
      <div id="spot-reviews-container">
        {reviews.map((review) => (
          <div id="spot-reviews-container" key={review?.id}>
            <div id="review" key={review?.id}>
              Review:{review?.review}
            </div>
            <div>
              Name: {review?.User?.firstName}
              {review?.User?.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
