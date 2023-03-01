import { useState } from "react";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import PopUpFullRecipe from "./popUpFullRecipe";

const CardItem = ({ recipe }) => {
  const {
    id,
    title,
    image,
    missedIngredientCount: count,
    missedIngredients,
  } = recipe;

  const [isClicked, setClick] = useState(false);

  const handleCloseWindow = () => {
    setClick(!isClicked);
  };

  const onViewFullRecipe = () => {
    setClick(!isClicked);
  };
  const fullRecipe = useRecipeInfoById(id);

  if (!fullRecipe) {
    return <p>Loading FULL recipe!</p>;
  }

  if (isClicked) {
    return (
      <PopUpFullRecipe recipe={fullRecipe} onCloseWindow={handleCloseWindow} />
    );
  }
  if (!isClicked) {
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
                          <img
                            src={image}
                            className="card-img-top"
                            alt={name}
                          />
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
          <button onClick={onViewFullRecipe} className="btn-full-recipe">
            View Full Recipe
          </button>
        </div>
      </div>
    );
  }
};

export default CardItem;
