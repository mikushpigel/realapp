import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import favServics from "../../services/favServices";
import recipesService from "../../services/recipeApiServices";
import { getUserDetails } from "../../services/userService";
import PopUpFullRecipe from "./popUpFullRecipe";

const ImageRecipeCard = ({
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
    <div className="image-card-container">
      <div className="card-hover">
        <div className="card-hover__content">
          <h1 className="card-hover__title">{title}</h1>

          <button onClick={() => handleClick(id)} className="card-hover__link">
            <span> View Full Recipe</span>

            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          <div className="card-hover__delete">{deleteLink}</div>
        </div>
        <img src={image} className="card-img-top" alt={title} />
      </div>
    </div>
  );
};

export default ImageRecipeCard;
