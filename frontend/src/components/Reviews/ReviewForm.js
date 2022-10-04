import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { CreateNewReview } from "../../store/reviews";
export default function ReviewForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      spotId,
      review,
      stars,
    };

    await dispatch(CreateNewReview(payload));

    history.push(`/user/reviews`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Review</h2>
      <label>
        Review
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <label>
        Stars
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </label>

      <input type="submit" />
    </form>
  );
}
