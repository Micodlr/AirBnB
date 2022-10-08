import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GetMyReviews, reviewEdit } from "../../store/reviews";
import { reviewDelete } from "../../store/reviews";
export default function EditSpotForm() {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(GetMyReviews());
  }, [dispatch]);

  const reviewToEdit = useSelector((state) => state.reviews[reviewId]);

  const [review, setReview] = useState(reviewToEdit.review);
  const [stars, setStars] = useState(reviewToEdit.stars);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      id: reviewId,
      review,
      stars,
    };

    await dispatch(reviewEdit(payload));

    history.push(`/user/reviews`);
  };
  const onClick = async (e) => {
    e.preventDefault();

    await dispatch(reviewDelete(reviewId));
    history.push(`/user/spots`);
  };

  return (
    <div id="edit-spot-container">
      {/* <div className="edit-spot-form"> */}
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <h2>Edit Review</h2>
        <label>
          Review
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            max="5"
            min="1"
          />
        </label>

        <input type="submit" />
        <button id="delete-btn" onClick={onClick}>
          delete
        </button>
      </form>
    </div>
    // </div>
  );
}
