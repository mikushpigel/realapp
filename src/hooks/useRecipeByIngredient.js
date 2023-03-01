import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";

export const useRecipeByIngredient = (ingredients) => {
  console.log("userecipebyIngredient");
  const [matchingRecipe, setMetchingRecipe] = useState(null);
  const toApi = ingredients.join(",+");

  useEffect(() => {
    const getRecipeByIngridient = async () => {
      console.log("userecipebyIngredient- useeffect");
      setMetchingRecipe(await recipesService.getRecipeByIngridient(toApi));
    };

    if (!ingredients) return;
    getRecipeByIngridient();
  }, [ingredients]);
  //   console.log(matchingRecipe);
  return matchingRecipe;
};

export default useRecipeByIngredient;
