import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="footer">
      <div className="footer__logo-div">
        <img
          src={require("../images/cook_icon.png")}
          alt="logo"
          className="footer__logo"
        />
      </div>
      <div className="footer__wrapper">
        <div className="footer__box">
          <div className="footer__navbar">
            <ul className="footer__list">
              <li className="footer__item">
                <NavLink className="footer__link" to="/">
                  HOME
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="footer__link" to="about">
                  ABOUT US
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="footer__link" to="search-by">
                  SEARCH BY
                </NavLink>
              </li>
              {user?.biz && (
                <>
                  <li className="footer__item">
                    <NavLink className="footer__link" to="my-favorites">
                      MY FAVORITES
                    </NavLink>
                  </li>
                  <li className="footer__item">
                    <NavLink className="footer__link" to="my-buylist">
                      MY SHOPPING LIST
                    </NavLink>
                  </li>
                </>
              )}
              {user ? (
                <li className="footer__item">
                  <NavLink className="footer__link" to="sign-out">
                    SIGN OUT
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="footer__item">
                    <NavLink className="footer__link" to="sign-in">
                      SIGN IN
                    </NavLink>
                  </li>
                  <li className="footer__item">
                    <NavLink className="footer__link" to="sign-up">
                      SIGN UP
                    </NavLink>
                  </li>
                  <li className="footer__item">
                    <NavLink className="footer__link" to="sign-up-premium">
                      SIGN UP PREMIUM
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="footer__box">
          <p className="footer__copyright">
            <li> Built By</li>
            <NavLink to="#" className="footer__link">
              Rotem Mika Shpigel
            </NavLink>
            <li>All Rights Reserved</li>
            <span>{new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
