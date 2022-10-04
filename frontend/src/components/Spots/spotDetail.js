import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useParams, Link } from "react-router-dom";
import GetSpotReviews from "../Reviews/Reviews";
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
      <div id="spot" key={spot?.id}>
        <div id="name">{spot?.name}</div>
        <img src={spot?.previewImage} alt={spot?.name}></img>
        <div>{spot?.address}</div>
        <div>{spot?.price}/night</div>
      </div>
      <div id="reviews-container">
        reviews
        <div>
          <Link to={`/reviews/${spot?.id}`}>Add review</Link>
        </div>
        <GetSpotReviews spotId={spotId} />
      </div>
      <Link to="/">Back to Spots</Link>
    </div>
  );
}
