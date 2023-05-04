import { useEffect, useState } from "react";
import UseMyFav from "../../hooks/useMyFav";
import useRecipeByIngredient from "../../hooks/useRecipeByIngredient";
import { cheakRecipeList } from "../../utils/checkRecipeList.js";
import CardItem from "./CardItem";
import TopButton from "../common/TopButton";

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
      <div className="random-rotate__cards-container">
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
        <TopButton />
      </div>
    </>
  );
};

export default RecipesList;
