export const API_KEY = "884356b859aa40ce98ff8cc3e946b59a";

export async function getRecipeByIngridient(ingredients) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=100&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  return body;
}

const recipesService = {
  getRecipeByIngridient,
};

export default recipesService;
