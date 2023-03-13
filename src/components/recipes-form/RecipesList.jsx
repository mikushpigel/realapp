import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import UseMyFav from "../../hooks/useMyFav";
import useRecipeByIngredient from "../../hooks/useRecipeByIngredient";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import favServics from "../../services/favServices";
import recipesService from "../../services/recipeApiServices";
import { cheakRecipeList } from "../../utils/checkRecipeList.js";
import CardItem from "./CardItem";

const RecipesList = ({ prodList }) => {
  const [matchingRecipes, setMetchingRecipe] = useState([]);
  const recipes = useRecipeByIngredient(prodList);
  const myFavs = UseMyFav();

  useEffect(() => {
    const chekfavlist = () => {
      console.log("render useeffect cheack fav list", "matching recipe::::");
      const arr = recipes.map((rec) => {
        const exist = myFavs.find((fav) => fav.id === rec.id);
        console.log(exist, "render exist");
        if (exist) {
          return {
            ...rec,
            isInfo: false,
            isFavorite: true,
            fullRecipe: exist.fullRecipe,
          };
        }
        return {
          ...rec,
          isInfo: false,
          isFavorite: false,
          fullRecipe: null,
        };
      });
      setMetchingRecipe(arr);
    };
    if (!recipes.length) return;
    chekfavlist();
  }, [recipes, myFavs]);

  const onFavorite = async (id, fullInfo) => {
    console.log(id, fullInfo);
    setMetchingRecipe((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return {
            ...rec,
            isFavorite: true,
            fullRecipe: fullInfo,
          };
        }
        return rec;
      })
    );
  };

  async function onViewFullRecipe(id) {
    await cheakRecipeList(matchingRecipes, id, setMetchingRecipe, true, null);
  }

  const onCloseWindow = (id) => {
    setMetchingRecipe((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return { ...rec, isInfo: false };
        }
        return rec;
      })
    );
  };

  if (!matchingRecipes.length) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wrapper-cards">
        {matchingRecipes
          .sort((a, b) =>
            a.missedIngredientCount > b.missedIngredientCount ? 1 : -1
          )
          .map((recipe) => (
            <CardItem
              key={recipe.id}
              recipe={recipe}
              onViewFullRecipe={onViewFullRecipe}
              onCloseWindow={onCloseWindow}
              favorites={myFavs}
              onFavorite={onFavorite}
            />
          ))}
      </div>
    </>
  );
};

export default RecipesList;

// const onFavorite = async (id) => {
//   console.log("add favorite", id);
// const match = matchingRecipes.find((recipe) => recipe.id === id);
// const repite = myFav.find((recipe) => recipe.id === id);

// if (!repite && match) {
//   setMyFav((oldFav) => [...oldFav, match]);
// const {
//   likes,
//   missedIngredientCount,
//   missedIngredients,
//   fullRecipe,
//   isInfo,
// } = match;
// try {
//   await favServics.saveFavorite({
//     likes,
//     missedIngredientCount,
//     missedIngredients,
//     fullRecipe,
//     isInfo,
//   });
//   toast("your favorite saved successfuly!", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });
// } catch ({ response }) {
//   if (response && response.status === 400) {
//     console.log(response.data);
//   }
// }
// }
// };
