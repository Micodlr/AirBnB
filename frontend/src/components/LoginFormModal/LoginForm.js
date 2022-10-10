import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import SignupForm from "../SignupFormModal/SignupForm";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();

        const err = [data.message];

        if (data && data.message) setErrors(err);
      }
    );
  };

  const onClick = (e) => {
    e.preventDefault();
    setCredential("demo");
    setPassword("password");
  };

  return (
    <>
      <h3>Welcome to Airbnb</h3>
      <div>
        {`Not a member yet? `}
        <button id="signup" onClick={() => setShowModal(true)}>
          Sign Up
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignupForm />
          </Modal>
        )}
      </div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          Username
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <br></br>
        </label>

        <button type="submit">Log In</button>
        <button className="demo" onClick={onClick}>
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginForm;
