import { useEffect, useState } from "react";
import recipesService from "../services/recipeApiServices";

export const useRandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const getRandomRecipes = async () => {
      const { recipes } = await recipesService.getRandomRecipes();
      setRandomRecipes(recipes);
      console.log("randommm-api", recipes);
    };

    getRandomRecipes();
  }, []);

  return randomRecipes;
};
