import { Link, NavLink } from "react-router-dom";
import PageHeader from "./common/PageHeader";

const SearchBy = () => {
  return (
    <>
      <PageHeader title="Search By" />
      <div className="searchby__container">
        <div className="searchby__box">
          <NavLink to="/search" className="footer__link ">
            by ingredients
          </NavLink>
        </div>
        <div className="searchby__box">
          <NavLink to="/search-by-nutrients" className="footer__link">
            by nutrients
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SearchBy;
