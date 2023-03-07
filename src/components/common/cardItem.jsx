import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import recipesService from "../../services/recipeApiServices";
import { getUserDetails } from "../../services/userService";
import PopUpFullRecipe from "./popUpFullRecipe";

const CardItem = ({ recipe }) => {
  const {
    id,
    title,
    image,
    missedIngredientCount: count,
    missedIngredients,
  } = recipe;
  const { user } = useAuth();
  const [isInfo, setInfo] = useState(false);
  const [fullRecipe, setFullRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleCloseWindow = () => {
    // setClick(!isClicked);
    setInfo(!isInfo);
  };

  const onViewFullRecipe = async () => {
    if (!user?.biz) {
      setError("This is for premium clients Only, please sign Up premiume");
      return;
    }
    setInfo(true);
    if (!fullRecipe) {
      setFullRecipe(await recipesService.getRecipeInfoById(id));
    }
  };

  if (isInfo && fullRecipe) {
    return (
      <PopUpFullRecipe
        key={id}
        recipe={fullRecipe}
        onCloseWindow={handleCloseWindow}
      />
    );
  }

  return (
    <div className="card card-recipe" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        <div className="wrapper-missing-ingredient">
          <div>
            <h5>{count} Missing ingredients</h5>
          </div>

          <div className="missing-ingredients-div">
            {missedIngredients.map(
              ({ amount, unit, id, name, image }, index) => {
                return (
                  <div key={index} className="missedIngredientDiv">
                    {count > 5 ? (
                      ""
                    ) : (
                      <>
                        <img src={image} className="card-img-top" alt={name} />
                        <p>
                          {name.split(" ").length > 2
                            ? name.split(" ").slice(0, 2)
                            : name}
                        </p>
                      </>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="wrapper-btn">
        <div>
          <button onClick={onViewFullRecipe} className="btn-full-recipe">
            View Full Recipe
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default CardItem;
