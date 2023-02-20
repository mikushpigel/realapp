import { useState } from "react";
import NavBar from "./Navbar";

const Hamburger = () => {
  const [isClicked, setClick] = useState(false);

  const handleClick = () => {
    setClick(!isClicked);
  };

  const handleActive = (isActive) => {
    if (isActive) {
      setClick(false);
    }
  };

  return (
    <>
      <div id="webapp_cover">
        <div id="menu_button">
          <input type="checkbox" id="menu_checkbox" />
          <label htmlFor="menu_checkbox" id="menu_label" onClick={handleClick}>
            <div id="menu_text_bar"></div>
          </label>
        </div>
      </div>
      {isClicked && <NavBar onActive={handleActive} />}
    </>
  );
};

export default Hamburger;
