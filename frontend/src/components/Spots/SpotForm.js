import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { CreateNewSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
export default function CreateSpotForm() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
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

    const res = await dispatch(CreateNewSpot(payload));

    // history.push(`/books/${book.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Spot</h2>
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
    </form>
  );
}
