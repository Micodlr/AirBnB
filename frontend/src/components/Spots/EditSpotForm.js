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
  const [errors, setErrors] = useState([]);

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
    try {
      await dispatch(SpotEdit(payload));
      history.push(`/user/spots/${spotId}`);
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.message) setErrors(data.errors);
    }
  };
  const onClick = async (e) => {
    e.preventDefault();

    await dispatch(SpotDelete(spotId));
    history.push(`/user/spots`);
  };
  return (
    <div id="edit-spot-container">
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <h2>Edit Spot</h2>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p>{errors.address}</p>
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <p>{errors.city}</p>
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <p>{errors.state}</p>
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <p>{errors.country}</p>
        </label>
        <label>
          lat
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
          <p>{errors.lat}</p>
        </label>
        <label>
          lng
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
          <p>{errors.lng}</p>
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p>{errors.name}</p>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <p>{errors.description}</p>
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <p>{errors.price}</p>
        </label>
        <input type="submit" />
        <button id="delete-btn" onClick={onClick}>
          Delete
        </button>
      </form>
    </div>
  );
}
