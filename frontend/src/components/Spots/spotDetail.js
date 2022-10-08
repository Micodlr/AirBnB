import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useParams, Link } from "react-router-dom";
import GetSpotReviews from "../Reviews/Reviews";
import ReviewForm from "../Reviews/ReviewForm";
// import { getAllreviews } from "../../store/reviews";

export default function SpotDetails() {
  const { spotId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
    // dispatch(getAllreviews());
  }, [dispatch]);
  const spot = useSelector((state) => state.spots[spotId]);

  return (
    <div>
      <div id="spot-container" key={spot?.id}>
        <div id="spot-details">
          <div id="name">
            <h2>{spot?.name}</h2>
          </div>
          <img
            id="spot-details-img"
            src={spot?.previewImage}
            alt={spot?.name}
          ></img>
          <div>
            <i className="fa-regular fa-star"> </i>
            {spot?.avgRating}
          </div>

          <div>{spot?.address}</div>
          <div>
            {spot?.city}, {spot?.state}
          </div>

          <div>${spot?.price}/night</div>
        </div>
        <div id="description">{spot?.description}</div>
      </div>
      <div id="reviews-container">
        <div>
          {/* <Link to={`/reviews/${spot?.id}`}>Add review</Link> */}
          <ReviewForm spotId={spot?.id} />
        </div>
        <GetSpotReviews spotId={spotId} />
      </div>

      <Link to="/">
        <button id="back">Back to Spots</button>
      </Link>
    </div>
  );
}
