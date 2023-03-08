import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateNewSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
export default function CreateSpotForm() {
  const history = useHistory();
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
  const [errors, setErrors] = useState([]);

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

    try {
      await dispatch(CreateNewSpot(payload));
      history.push("/user/spots");
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.message) setErrors(data.errors);
    }
    // const result = await dispatch(CreateNewSpot(payload))
    //   .catch(async (res) => {
    //     const data = await res.json();

    //     if (data && data.errors) setErrors(data.errors);
    //     console.log(errors);
    //   })
    //   .then(() => {
    //     console.log(errors.length);
    //     // if (errors.length === 0) {
    //     //   // history.push("/user/spots");
    //     // }
    //   });

    // console.log(errors.length);

    // history.push(`/user/spots`);
    // if (errors.length <= 0)
  };

  return (
    <div id="container">
      <div id="create-new-spot-container">
        <form className="spots-form" onSubmit={handleSubmit}>
          <h2>Create a New Spot</h2>

          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="address"
            />
            <p className="errors">{errors.address}</p>
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="city"
            />
            <p className="errors">{errors.city}</p>
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="state"
            />
            <p className="errors">{errors.state}</p>
          </label>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="country"
            />
            <p className="errors">{errors.country}</p>
          </label>
          <label>
            lat
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              placeholder="latitude"
            />
            <p className="errors">{errors.lat}</p>
          </label>
          <label>
            lng
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              placeholder="longtitude"
            />
            <p className="errors">{errors.lng}</p>
          </label>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="name"
            />
            <p className="errors">{errors.name}</p>
          </label>
          <label>
            Description
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="description...."
            />
            <p className="errors">{errors.description}</p>
          </label>
          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <p className="errors">{errors.price}</p>
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
