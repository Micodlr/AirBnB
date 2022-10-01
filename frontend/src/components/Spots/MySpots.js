import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySpots } from "../../store/spots";
import "./spots.css";
import { Link } from "react-router-dom";

export default function MySpots() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mySpots());
    // const getUser = async () => await dispatch(restoreUser());
    // console.log(getUser());
  }, [dispatch]);
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);
  console.log(spots, "=====");

  return (
    // <div>mySpots</div>
    <div id="mySpots">
      {spots.map((spot) => (
        <div id="spot" key={spot.id}>
          <img src={spot.previewImage} alt="spot.name"></img>
          <div>
            <i className="fa-solid fa-star"> </i>
            {spot.avgRating}
          </div>
          <div id="edit-delete-container">
            <Link to={`/user/edit/${spot.id}`}>edit</Link>
            <button>delete</button>
          </div>
          <div>
            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>{" "}
          </div>
          <div>{spot.address}</div>
          <div>${spot.price}/night</div>
        </div>
      ))}
    </div>
  );
}
