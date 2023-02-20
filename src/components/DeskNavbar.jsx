import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const DeskNavbar = () => {
  const [isScroll, setScroll] = useState(0);

  const styles = {
    backgroundColor: isScroll > 0 ? "rgb(203, 178, 231)" : "",
    padding: isScroll > 0 ? "10px 100px" : "40px 100px",
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScroll(e.currentTarget.scrollY);
    });
  }, [isScroll]);

  return (
    <>
      <div
        className={isScroll > 0 ? "desk-nav sticky" : "desk-nav"}
        style={styles}
      >
        <NavLink className={"d-logo a-link"} to="/">
          <img
            src={require("../images/coook.png")}
            alt="logo"
            className="logo-b"
          />
        </NavLink>
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
              to="recipes"
            >
              | RECIPES |
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
          <li>
            <NavLink
              className={isScroll > 0 ? "a-link" : "link-item"}
              to="my-favorites"
            >
              | MY FAVORITES |
            </NavLink>
          </li>
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
        </ul>
      </div>
      <section className="banner"></section>
    </>
  );
};

export default DeskNavbar;
