import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { mySpots, SpotDelete } from "../../store/spots";
import { SpotEdit } from "../../store/spots";

export default function EditSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(mySpots());
  }, [dispatch]);
  console.log(spotId);
  const spotToEdit = useSelector((state) => state.spots[spotId]);

  const [address, setAddress] = useState(spotToEdit.address);
  const [city, setCity] = useState(spotToEdit.city);
  const [state, setState] = useState(spotToEdit.state);
  const [country, setCountry] = useState(spotToEdit.country);
  const [lat, setLat] = useState(spotToEdit.lat);
  const [lng, setLng] = useState(spotToEdit.lng);
  const [name, setName] = useState(spotToEdit.name);
  const [description, setDescription] = useState(spotToEdit.description);
  const [price, setPrice] = useState(spotToEdit.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      id: spotId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    await dispatch(SpotEdit(payload));

    history.push(`/spots/${spotId}`);
  };
  const onClick = async (e) => {
    e.preventDefault();

    await dispatch(SpotDelete(spotId));
    history.push(`/user/spots`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Spot</h2>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <label>
        lat
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </label>
      <label>
        lng
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <input type="submit" />
      <button onClick={onClick}>delete</button>
    </form>
  );
}
