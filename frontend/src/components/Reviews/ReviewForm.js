import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { CreateNewReview } from "../../store/reviews";
export default function ReviewForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      spotId,
      review,
      stars,
    };

    try {
      await dispatch(CreateNewReview(payload));
      history.push("/user/reviews");
    } catch (res) {
      const data = await res.json();

      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  return (
    <div id="container">
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <h2>Create Review</h2>
          <label>
            Review
            <textarea
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
        </form>
      </div>
    </div>
  );
}
