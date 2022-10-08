import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyReviews } from "../../store/reviews";
import { Link, useHistory } from "react-router-dom";

export default function MyReviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => await dispatch(GetMyReviews());
    allReviews();
  }, [dispatch]);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  return (
    <div id="wrapper">
      <div id="my-reviews-header">
        <h1>My Reviews</h1>
      </div>
      <div id="my-reviews-container">
        <div id="myReviews" key="myreviews">
          {reviews.map((review) => (
            <div id="review" key={review?.id}>
              <div id="spot-name">
                <Link to={`/spots/${review?.Spot?.id}`}>
                  {review?.Spot?.name}
                </Link>
              </div>
              <div id="spot-address">{review?.Spot?.address}</div>

              <div>
                <i className="fa-regular fa-star"> </i>
                {review?.stars}
              </div>
              <div id="updated-at">
                Updated At: {review?.updatedAt?.slice(0, 10)}
              </div>

              <div>{review?.review}</div>
              <div id="edit-delete-container">
                <Link to={`/user/review/edit/${review?.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
