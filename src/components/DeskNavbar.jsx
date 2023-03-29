import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { getUserDetails } from "../services/userService";

const DeskNavbar = () => {
  const { user } = useAuth();
  const [isScroll, setScroll] = useState(0);

  const styles = {
    background:
      isScroll > 0 ? "linear-gradient(to right, #355c7d, #cda99dd6 )" : "",

    padding: isScroll > 0 ? "30px 100px" : "40px 100px",
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScroll(e.currentTarget.scrollY);
    });
  }, []);

  return (
    <>
      <div
        className={isScroll > 0 ? "desk-nav sticky" : "desk-nav"}
        style={styles}
      >
        {/* <NavLink className={"a-link"} to="/">
          <img
            src={require("../images/coook.png")}
            alt="logo"
            className="logo-cook"
          />
        </NavLink> */}
        <ul className="desk-nav-ul">
          <li>
            <NavLink className={isScroll > 0 ? "a-link" : "link-item"} to="/">
              | HOME |
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isScroll > 0 ? "a-link" : "link-item"}
              to="about"
            >
              | ABOUT US |
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isScroll > 0 ? "a-link" : "link-item"}
              to="search"
            >
              | SEARCH |
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isScroll > 0 ? "a-link" : "link-item"}
              to="search-by-nutrients"
            >
              | SEARCH BY NUTRIENTS |
            </NavLink>
          </li>
          <li>
            <NavLink
              className={isScroll > 0 ? "a-link" : "link-item"}
              to="quick-and-easy"
            >
              | QUICK & EASY |
            </NavLink>
          </li>
          {user?.biz && (
            <li>
              <NavLink
                className={isScroll > 0 ? "a-link" : "link-item"}
                to="my-favorites"
              >
                | MY FAVORITES |
              </NavLink>
            </li>
          )}
          {user?.biz && (
            <li>
              <NavLink
                className={isScroll > 0 ? "a-link" : "link-item"}
                to="my-buylist"
              >
                | MY BUY LIST |
              </NavLink>
            </li>
          )}

          {user ? (
            <li>
              <NavLink
                className={isScroll > 0 ? "a-link" : "link-item"}
                to="sign-out"
              >
                | SIGN OUT |
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  className={isScroll > 0 ? "a-link" : "link-item"}
                  to="sign-in"
                >
                  | SIGN IN |
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={isScroll > 0 ? "a-link" : "link-item"}
                  to="sign-up"
                >
                  | SIGN UP |
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={isScroll > 0 ? "a-link" : "link-item"}
                  to="sign-up-premium"
                >
                  | SIGN UP PREMIUM |
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default DeskNavbar;
