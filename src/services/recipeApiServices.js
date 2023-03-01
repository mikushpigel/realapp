export const API_KEY = "884356b859aa40ce98ff8cc3e946b59a";

export async function getRecipeByIngridient(ingredients) {
  console.log("getrecipbyINGREDIENT");
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=2&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const body = await response.json();

  return body;
}
export const getRecipeInfoById = async (id) => {
  console.log("getrecipbyID");
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

const recipesService = {
  getRecipeByIngridient,
  getRecipeInfoById,
};

export default recipesService;
