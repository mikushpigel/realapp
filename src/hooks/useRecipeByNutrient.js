import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";
import UseMyFav from "./useMyFav";

export const useRecipeByNutrient = (nutrients) => {
  const [matchingRecipe, setMetchingRecipe] = useState([]);

  useEffect(() => {
    const getRecipeByNutrients = async () => {
      let str = "";
      nutrients.map((obj) => {
        for (let type in obj) {
          str += `${type}=${obj[type]}&`;
        }
      });
      const recipes = await recipesService.getRecipeByNutrients(str);
      setMetchingRecipe(recipes);
      console.log("nutrients-api", recipes);
    };

    if (!nutrients) return;
    getRecipeByNutrients();
  }, [nutrients]);

  return matchingRecipe;
};
