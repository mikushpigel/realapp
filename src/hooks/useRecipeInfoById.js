import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";

export const useRecipeInfoById = (id) => {
  const [isClicked, setClick] = useState(false);
  const [fullRecipe, setFullRecipe] = useState(null);

  useEffect(() => {
    const getRecipeInfoById = async () => {
      setFullRecipe(await recipesService.getRecipeInfoById(id));
    };
    if (!id) return;
    getRecipeInfoById();
  }, [id]);

  return fullRecipe;
};

export default useRecipeInfoById;
