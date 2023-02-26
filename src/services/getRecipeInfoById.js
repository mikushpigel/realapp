import { API_KEY } from "./getRecipeByIngredient";

const getRecipeInfoById = async (id) => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  return body;
};

export default getRecipeInfoById;
