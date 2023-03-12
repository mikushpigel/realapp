import recipesService from "../services/recipeApiServices";

export async function cheakRecipeList(
  matchingRecipes,
  id,
  setMetchingRecipe,
  isInfo,
  isFavorite
) {
  const isNeedFullRecipe = matchingRecipes.find(
    (recipe) => recipe.id === id && !recipe.fullRecipe
  );
  const isFullRecipe = matchingRecipes.find(
    (recipe) => recipe.id === id && recipe.fullRecipe
  );
  if (isNeedFullRecipe) {
    console.log("ביקש בקשה מהשרת");
    const fullInfo = await recipesService.getRecipeInfoById(id);
    setMetchingRecipe((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return {
            ...rec,
            fullRecipe: fullInfo,
            isInfo: isInfo === null ? rec.isInfo : isInfo,
            isFavorite: isFavorite === null ? rec.isFavorite : isFavorite,
          };
        }
        return rec;
      })
    );
  }

  if (isFullRecipe) {
    console.log("לא ביקש בקשה מהשרתתת");
    setMetchingRecipe((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return {
            ...rec,
            isInfo: isInfo === null ? rec.isInfo : isInfo,
            isFavorite: isFavorite === null ? rec.isFavorite : isFavorite,
          };
        }
        return rec;
      })
    );
  }

  return matchingRecipes;
}
