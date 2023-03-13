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
}) => {
  const {
    id,
    _id,
    title,
    image,
    likes,
    missedIngredientCount: count,
    missedIngredients,
    isInfo,
    isFavorite,
    fullRecipe,
  } = recipe;

  const { user } = useAuth();
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isClicked, setClick] = useState(false);

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
        try {
          await favServics.saveFavorite({
            id,
            title,
            image,
            likes,
            missedIngredientCount: count,
            missedIngredients,
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
      alert(
        "The favorites is for premium account only! please sign up premium"
      );
      return;
    }
    setClick(id);

    setFavorite(true);
    setError("");
  };

  if (isInfo) {
    console.log("is info true-----ful recipe:::", fullRecipe);
    return (
      <PopUpFullRecipe recipe={fullRecipe} onCloseWindow={onCloseWindow} />
    );
  }

  return (
    <div className="card card-recipe" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <div>
          <h5 className="card-title">{title}</h5>
        </div>
        <div>
          <span style={{ color: "purple" }}>
            {likes} <i className="bi bi-heart-fill"></i>
          </span>
        </div>
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
