import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./spots.css";
import { Link } from "react-router-dom";
import SpotDetails from "./spotDetail";
import { restoreUser } from "../../store/session";

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
          <img src={spot.previewImage}></img>
          <div>
            <i className="fa-solid fa-star"> </i>
            {spot.avgRating}
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
