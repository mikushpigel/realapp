import { Toast } from "bootstrap";
import { useEffect, useState } from "react";
import recipesService from "../services/getRecipeByIngredient";

export const useRecipeByIngredient = (ingredients) => {
  const [matchingRecipe, setMetchingRecipe] = useState(null);
  const toApi = ingredients.join(",+");
  console.log(toApi);
  useEffect(() => {
    const getRecipeByIngridient = async () => {
      setMetchingRecipe(await recipesService.getRecipeByIngridient(toApi));
    };

    if (!ingredients) return;
    getRecipeByIngridient();
  }, [ingredients]);

  return matchingRecipe;
};

export default useRecipeByIngredient;
