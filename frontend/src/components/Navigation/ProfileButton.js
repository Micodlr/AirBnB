import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "rgb(255, 90, 95)",
};
function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <NavLink
        to="/user/reviews"
        style={linkStyle}
        activeClassName="active-navlink"
      >
        myReviews
      </NavLink>
      <NavLink
        to="/user/spots"
        style={linkStyle}
        activeClassName="active-navlink"
      >
        mySpots
      </NavLink>

      <button onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>

      {showMenu && (
        <div className="dropdown-content">
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
