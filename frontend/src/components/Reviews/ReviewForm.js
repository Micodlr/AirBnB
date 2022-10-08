import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateNewReview, getAllreviews } from "../../store/reviews";
export default function ReviewForm({ spotId }) {
  //   const { spotId } = useParams();
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
      //   history.push("/user/reviews");
      dispatch(getAllreviews(spotId));
      history.push(`/spots/${spotId}`);
    } catch (res) {
      const data = await res.json();

      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  return (
    <div id="review-form-container">
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create Review</h2>
          {errors && (
            <ul>
              {errors.map((error, idx) => (
                <li className="errors" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          )}
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
