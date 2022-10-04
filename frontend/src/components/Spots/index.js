import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./spots.css";
import { Link } from "react-router-dom";

export default function SpotsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
    // const getUser = async () => await dispatch(restoreUser());
    // console.log(getUser());
  }, [dispatch]);
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);

  return (
    <div id="spotsContainer">
      {spots.map((spot) => (
        <div id="spot" key={spot.id}>
          {/* <SpotDetails spot={spot} /> */}
          <img src={spot.previewImage} alt={spot.name}></img>
          <div>
            <i className="fa-solid fa-star"> </i>
            {Number(spot.avgRating).toFixed(1)}
            {/* {console.log(Number(spot.avgRating).toFixed(1))} */}
          </div>
          <div>
            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
          </div>
          <div>{spot.address}</div>
          <div>${spot.price}/night</div>
        </div>
      ))}
    </div>
  );
}
