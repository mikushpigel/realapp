import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";


export const useRecipeByIngredient = (ingredients) => {
  const [matchingRecipe, setMetchingRecipe] = useState([]);

  useEffect(() => {
    const getRecipeByIngridient = async () => {
      const toApi = ingredients.map((prodname) => prodname.prod);
      const recipes = await recipesService.getRecipeByIngridient(toApi);
      setMetchingRecipe(recipes);
      console.log("getAPI!!", recipes);
    };

    if (!ingredients) return;
    getRecipeByIngridient();
  }, [ingredients]);

  return matchingRecipe;
};

export default useRecipeByIngredient;
