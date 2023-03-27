const API_KEY = "7912b7d9a1b047e2968e0caee8219a7b";
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function getRecipeByIngridient(ingredients) {
  const response = await fetch(
    `${BASE_URL}/findByIngredients?ingredients=${ingredients}&number=20&apiKey=${API_KEY}`,
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
  console.log("נשלחה בקשה לשרת");
  const response = await fetch(
    `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();

  return body;
};

export const getRecipeByNutrients = async (nutrients) => {
  const response = await fetch(
    `${BASE_URL}/findByNutrients?${nutrients}number=2&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  return body;
};

export const getRandomRecipes = async () => {
  const response = await fetch(
    `${BASE_URL}/random?number=8&apiKey=${API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  return body;
};

// export const getRecipeCardById = async (id) => {
//   const response = await fetch(`${BASE_URL}/${id}/card?apiKey=${API_KEY}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const body = await response.json();

//   return body;
// };

// export const getProductNutritionByIdWidget = async (id) => {
//   const response = await fetch(
//     `https://api.spoonacular.com/food/products/7657/nutritionWidget&apiKey=${API_KEY}`,
//     {
//       headers: {
//         "Content-Type": "text/html",
//       },
//     }
//   );
//   const body = await response.json();
//   return body;
// };

const recipesService = {
  getRecipeByIngridient,
  getRecipeInfoById,
  getRecipeByNutrients,
  getRandomRecipes,
};

export default recipesService;

// const prodWidget = await recipesService.getProductNutritionByIdWidget();
// console.log("product widget", prodWidget);
