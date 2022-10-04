import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyReviews } from "../../store/reviews";
import { Link } from "react-router-dom";

export default function MyReviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => await dispatch(GetMyReviews());
    allReviews();
  }, [dispatch]);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);

  return (
    <div>
      <h1>My Reviews</h1>
      <div id="myReviews" key="myreviews">
        {reviews.map((review) => (
          <div id="review" key={review?.id}>
            <div>
              <Link to={`/spots/${review?.Spot?.id}`}>
                {review?.Spot?.name}
              </Link>
            </div>
            <div>{review?.Spot?.address}</div>

            <div>
              <i className="fa-solid fa-star"> </i>
              {review?.stars}
            </div>
            <div>Updated At:{review?.updatedAt?.slice(0, 10)}</div>

            <div>{review?.review}</div>
            <div id="edit-delete-container">
              <Link to={`/user/review/edit/${review?.id}`}>edit</Link>
              <button>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
