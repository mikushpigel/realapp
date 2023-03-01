import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRecipeByIngredient from "../../hooks/useRecipeByIngredient";
import recipesService from "../../services/recipeApiServices";
import CardItem from "./CardItem";

const RecipesList = ({ recipe }) => {
  const matchingRecipes = useRecipeByIngredient(recipe);

  if (!matchingRecipes) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="wrapper-cards">
        {matchingRecipes
          .sort((a, b) =>
            a.missedIngredientCount > b.missedIngredientCount ? 1 : -1
          )
          .map((recipe) => (
            <CardItem key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </>
  );
};

export default RecipesList;
