import { useEffect, useState } from "react";
import UseMyFav from "../../hooks/useMyFav";
import { useRecipeByNutrient } from "../../hooks/useRecipeByNutrient";
import { cheakRecipeList } from "../../utils/checkRecipeList";
import CardItem from "../recipes-form/CardItem";

const RecipesListByNutrient = ({ nutrientsTypes }) => {
  const [matchingRecipes, setMetchingRecipe] = useState([]);
  const recipes = useRecipeByNutrient(nutrientsTypes);
  console.log("recipes", recipes);
  const myFavs = UseMyFav();

  useEffect(() => {
    const chekfavlist = () => {
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

  if (!recipes.length) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wrapper-cards">
        {matchingRecipes.map((recipe) => (
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

export default RecipesListByNutrient;
