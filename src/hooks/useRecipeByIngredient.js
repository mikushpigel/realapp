import { boolean } from "joi";
import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";
import UseMyFav from "./useMyFav";
import useRecipeInfoById from "./useRecipeInfoById";

// useEffect(() => {
//   const onFavorite = (id) => {
//     setMetchingRecipe((recipes) =>
//       recipes.map((recipe) => {
//         if (recipe.id === id) {
//           return { ...recipe, isFavorite: true };
//         }
//         return recipe;
//       })
//     );
//   };
//   onFavorite();
// }, [onFavorite]);
export const useRecipeByIngredient = (ingredients) => {
  const [matchingRecipe, setMetchingRecipe] = useState([]);

  useEffect(() => {
    const getRecipeByIngridient = async () => {
      console.log("render useeffect get recipe by ingridient");
      const toApi = ingredients.map((prodname) => prodname.prod);
      const recipes = await recipesService.getRecipeByIngridient(toApi);
      setMetchingRecipe(recipes);
      console.log("getAPI!!", recipes);
    };

    if (!ingredients) return;
    getRecipeByIngridient();
  }, [ingredients]);

  // useEffect(() => {
  //   const chekfavlist = () => {
  //     console.log("render useeffect cheack fav list", "matching recipe::::",matchingRecipe);
  //     setMetchingRecipe((recipes) =>
  //       recipes.map((rec) => {
  //         const exist = myFavs.find((fav) => fav.id === rec.id);
  //         console.log(exist, "render exist");
  //         if (exist) {
  //           return {
  //             isInfo: false,
  //             isFavorite: true,
  //             fullRecipe: exist.fullRecipe,
  //             ...rec,
  //           };
  //         }
  //         return {
  //           isInfo: false,
  //           isFavorite: false,
  //           fullRecipe: null,
  //           ...rec,
  //         };
  //       })
  //     );
  //   };
  //   if (!ingredients) return;
  //   chekfavlist();
  // }, [ingredients, myFavs]);

  // useEffect(() => {
  //   const getfull = () => {
  //     console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  //     setMetchingRecipe((recipes) =>
  //       recipes.map((rec) => {
  //         if (rec.id === fullRecipe1.id) {
  //           return { ...rec, isInfo: true, fullRecipe: fullRecipe1 };
  //         } else if (rec.id === fullRecipe1) {
  //           return { ...rec, isInfo: true };
  //         }
  //         return rec;
  //       })
  //     );
  //   };
  //   if (!fullRecipe1) return;
  //   getfull();
  // }, [fullRecipe1]);

  // useEffect(() => {
  //   const onClose = () => {
  //     setMetchingRecipe((recipes) =>
  //       recipes.map((rec) => {
  //         if (rec.id === idToClose) {
  //           return { ...rec, isInfo: false };
  //         }
  //         return rec;
  //       })
  //     );
  //   };

  //   onClose();
  // }, [idToClose]);

  return matchingRecipe;
};

export default useRecipeByIngredient;
