import { Link } from "react-router-dom";
import useRecipeByIngredient from "../../hooks/useRecipeByIngredient";

const CardRecipe = ({ recipe, onViewFullRecipe }) => {
  const matchingRecipes = useRecipeByIngredient(recipe);

  if (!matchingRecipes) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wrapper-cards">
        {matchingRecipes
          .sort((a, b) =>
            a.missedIngredientCount > b.missedIngredientCount ? 1 : -1
          )
          .map(
            ({
              id,
              title,
              image,
              missedIngredientCount: count,
              missedIngredients,
            }) => (
              <div
                key={id}
                className="card card-recipe"
                style={{ width: "18rem" }}
              >
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
                  <button
                    onClick={() => onViewFullRecipe(id)}
                    className="btn-full-recipe"
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default CardRecipe;
