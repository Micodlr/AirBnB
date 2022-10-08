import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (Object.values(sessionUser).length > 0) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />

        <SignupFormModal />

        {/* <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div id="navbar">
      <NavLink id="home-button" exact to="/">
        <img
          id="airbnb-img"
          alt="airbnb logo"
          src="data:image/png;base64,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"
        />
        {/* <i className="fa-solid fa-house-chimney"></i> */}
      </NavLink>
      <ul>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;
