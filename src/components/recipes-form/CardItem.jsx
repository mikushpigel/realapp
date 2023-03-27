import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import favServics from "../../services/favServices";
import recipesService from "../../services/recipeApiServices";
import { getUserDetails } from "../../services/userService";
import PopUpFullRecipe from "./popUpFullRecipe";

const CardItem = ({
  recipe,
  onViewFullRecipe,
  onCloseWindow,
  onFavorite,
  favorites,
  deleteLink = null,
  viewFullRecipeLink = null,
}) => {
  const {
    id,
    title,
    image,
    likes,
    missedIngredientCount: count,
    missedIngredients,
    usedIngredients,
    isInfo,
    fullRecipe,
    calories,
    carbs,
    fat,
    protein,
  } = recipe;

  const { user } = useAuth();
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isClicked, setClick] = useState(false);
  const [ingredientsList, setIngredients] = useState(null);

  useEffect(() => {
    const exist = favorites.find((fav) => fav.id === id);
    if (exist) {
      setFavorite(true);
    }
  }, favorites);

  useEffect(() => {
    async function saveToFavorites() {
      if (isClicked) {
        console.log(fullRecipe);
        const fullInfo = !fullRecipe
          ? await recipesService.getRecipeInfoById(isClicked)
          : fullRecipe;
        console.log(fullInfo);
        try {
          await favServics.saveFavorite({
            id,
            title,
            image,
            likes,
            missedIngredientCount: count,
            missedIngredients,
            usedIngredients,
            fullRecipe: fullInfo,
            isInfo,
            isFavorite: true,
          });
          toast("your favorite saved successfuly!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          onFavorite(id, fullInfo);
        } catch ({ response }) {
          if (response && response.status === 400) {
            console.log(response.data);
          }
        }
      }
    }

    saveToFavorites();
    //  return () => setClick(false);
  }, [isClicked]);

  const handleClick = () => {
    onViewFullRecipe(id);
    setError("");
  };

  const handleFavoriteClick = () => {
    if (!user?.biz) {
      toast.error("premium account only!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        fontSize: "5rem",
      });
      return;
    }
    setClick(id);

    setFavorite(true);
    setError("");
  };

  if (isInfo) {
    console.log("is info true-----ful recipe:::", fullRecipe);
    return (
      <PopUpFullRecipe recipe={recipe} onCloseWindow={onCloseWindow} key={id} />
    );
  }

  return (
    <div className="card card-recipe">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <div>
          <h1 className="card-title">{title}</h1>
        </div>
        {(likes || likes === 0) && (
          <div>
            <span style={{ color: "purple", fontSize: "2.5rem" }}>
              {likes} <i className="bi bi-heart-fill"></i>
            </span>
          </div>
        )}
        <div>
          <button
            className="star"
            onClick={() => handleFavoriteClick(id)}
            title={favorite ? "already in your favorites" : "add to favorites"}
            disabled={favorite}
          >
            <span style={{ color: favorite ? "purple" : "grey" }}>
              <i className="bi bi-star-fill"></i>
            </span>
          </button>
        </div>
        {count && (
          <div className="wrapper-missing-ingredient">
            <div>
              <h4>{count} Missing ingredients</h4>
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
                            className="img-ingredient"
                            alt={name}
                          />
                          {/* <p>
                            {name.split(" ").length > 2
                              ? name.split(" ").slice(0, 2)
                              : name}
                          </p> */}
                        </>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
      {calories && (
        <div className="nutrient-div">
          <li> calories: {calories}</li>
          <li>protein: {protein}</li>
          <li>carbs: {carbs}</li>
          <li>fat: {fat}</li>
        </div>
      )}
      <div className="wrapper-btn">
        <div>
          {viewFullRecipeLink}
          <button onClick={() => handleClick(id)} className="btn-full-recipe">
            View Full Recipe
          </button>
        </div>
        <div>{deleteLink}</div>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default CardItem;
