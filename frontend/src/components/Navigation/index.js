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
          src="https://pbs.twimg.com/media/Bsure9HIEAAZ48G.png"
          style={{ color: "green" }}
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
