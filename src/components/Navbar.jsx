import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const NavBar = ({ onActive }) => {
  const { user } = useAuth();
  const [isActive, setActiv] = useState(false);

  const handleClick = (e) => {
    setActiv(true);
    onActive(true);
  };

  if (isActive) {
    return "";
  }

  return (
    <ul className="navbar-ul">
      <li className="navbar-li">
        <NavLink onClick={handleClick} className={"link-item"} to="/">
          | HOME |
        </NavLink>
      </li>
      <li className="navbar-li">
        <NavLink onClick={handleClick} className={"link-item"} to="about">
          | ABOUT US |
        </NavLink>
      </li>
      <li className="navbar-li">
        <NavLink onClick={handleClick} className={"link-item"} to="search">
          | SEARCH |
        </NavLink>
      </li>
      <li className="navbar-li">
        <NavLink
          onClick={handleClick}
          className={"link-item"}
          to="search-by-nutrients"
        >
          | SEARCH BY NUTRIENTS |
        </NavLink>
      </li>
      <li className="navbar-li">
        <NavLink
          onClick={handleClick}
          className={"link-item"}
          to="quick-and-easy"
        >
          | QUICK & EASY |
        </NavLink>
      </li>
      {user?.biz && (
        <>
          <li className="navbar-li">
            <NavLink
              onClick={handleClick}
              className={"link-item"}
              to="my-favorites"
            >
              | MY FAVORITES |
            </NavLink>
          </li>
          <li className="navbar-li">
            <NavLink
              onClick={handleClick}
              className={"link-item"}
              to="my-buylist"
            >
              | MY BUY LIST |
            </NavLink>
          </li>
        </>
      )}
      {user ? (
        <li className="navbar-li">
          <NavLink onClick={handleClick} className={"link-item"} to="sign-out">
            | SIGN OUT |
          </NavLink>
        </li>
      ) : (
        <>
          <li className="navbar-li">
            <NavLink onClick={handleClick} className={"link-item"} to="sign-in">
              | SIGN IN |
            </NavLink>
          </li>
          <li className="navbar-li">
            <NavLink onClick={handleClick} className={"link-item"} to="sign-up">
              | SIGN UP |
            </NavLink>
          </li>
          <li className="navbar-li">
            <NavLink
              onClick={handleClick}
              className={"link-item"}
              to="sign-up-premium"
            >
              | SIGN UP PREMIUM|
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
export default NavBar;
