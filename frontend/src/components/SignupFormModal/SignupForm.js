import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./signupForm.css";
// import "./Signup.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          password,
          firstName,
          lastName,
        })
      ).catch(async (res) => {
        // const data = await res.json();
        // const err = Object.values(data.errors);
        // // console.log(data);
        // if (data && err) setErrors(err);
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }

    setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul> */}
      <label>
        Firstname
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <p>{errors.firstName}</p>
      </label>
      <label>
        Lastname
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <p>{errors.lastName}</p>
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>{errors.email}</p>
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p>{errors.username}</p>
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>{errors.password}</p>
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
