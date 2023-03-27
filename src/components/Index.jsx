import { required } from "joi";
import background from "../images/vegbig.jpg";
import BlessUser from "./common/blessUser";
import RandomRecipes from "./RandomRecipes";

const Index = () => {
  const handleClickScroll = () => {
    const element = document.getElementById("homeid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <header className="header">
        <div class="logo-box">
          <img
            src={require("../images/yammygif.gif")}
            alt="Logo"
            class="logo"
          />
          <BlessUser />
        </div>

        <div class="text-box">
          <h1 class="heading-primary">
            <span class="heading-primary-main">Yummy Recipes</span>
            <span class="heading-primary-sub">
              Add Some Flavor To Your Life
            </span>
          </h1>

          <button
            className="btn-index btn-white btn-animation"
            onClick={handleClickScroll}
          >
            discover our site
          </button>
        </div>
      </header>

      <RandomRecipes />
    </>
  );
};

export default Index;
