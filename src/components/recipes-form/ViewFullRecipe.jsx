import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import favServics from "../../services/favServices";
import recipesService from "../../services/recipeApiServices";
import PopUpFullRecipe from "./popUpFullRecipe";

const ViewFullRecipe = () => {
  const navigate = useNavigate();
  const { fullRecipe } = useParams();

  console.log(fullRecipe);

  //  useEffect(()=>{
  //     const full = async () => {
  //         await fullRecipe
  //     }
  //  })

  //   if (!JSON.stringify(fullRecipe)) {
  //     return <p>Loading full recipe.....</p>;
  //   }
  //   return <PopUpFullRecipe recipe={JSON.stringify(fullRecipe)} />;
};

export default ViewFullRecipe;
