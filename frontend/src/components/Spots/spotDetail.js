import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { useParams, Link } from "react-router-dom";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);
  const spot = useSelector((state) => state.spots[spotId]);

  console.log(spot);
  return (
    <div>
      <div id="spot" key={spot.id}>
        <div id="name">{spot.name}</div>
        <img src={spot.previewImage}></img>
        <div>{spot.address}</div>
        <div>{spot.price}/night</div>
      </div>
      <Link to="/spots">Back to Spots</Link>
    </div>
  );
}
