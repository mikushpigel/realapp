import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import UseMyFav from "../../hooks/useMyFav";
import useRecipeByIngredient from "../../hooks/useRecipeByIngredient";
import useRecipeInfoById from "../../hooks/useRecipeInfoById";
import favServics from "../../services/favServices";
import recipesService from "../../services/recipeApiServices";
import { cheakRecipeList } from "../../utils/checkRecipeList.js";
import CardItem from "./CardItem";

const RecipesList = ({ prodList }) => {
  const [matchingRecipes, setMetchingRecipe] = useState([]);
  const recipes = useRecipeByIngredient(prodList);
  const myFavs = UseMyFav();

  useEffect(() => {
    console.log(myFavs, "myfavs!!!!!");
  }, [myFavs]);

  useEffect(() => {
    const chekfavlist = () => {
      console.log("render useeffect cheack fav list", "matching recipe::::");
      const arr = recipes.map((rec) => {
        const exist = myFavs.find((fav) => fav.id === rec.id);
        console.log(exist, "render exist");
        if (exist) {
          return {
            isInfo: false,
            isFavorite: true,
            fullRecipe: exist.fullRecipe,
            ...rec,
          };
        }
        return {
          isInfo: false,
          isFavorite: false,
          fullRecipe: null,
          ...rec,
        };
      });
      setMetchingRecipe(arr);
    };
    if (!recipes.length) return;
    chekfavlist();
  }, [recipes, myFavs]);

  // useEffect(() => {
  //   setMetchingRecipe(recipes);
  // }, [recipes]);

  // useEffect(() => {
  //   console.log(myFavs, "myfavs");
  // }, [prodList, myFavs]);
  // console.log("myfavs", myFavs);

  // useEffect(()=>{
  // const renderRecipeByIngridients = async () => {
  //   const recipes = await recipesService.getRecipeByIngridient(toApi);

  // }
  // },[matchingRecipes])
  // useEffect(() => {
  //   const getRecipeByIngridient = async () => {
  //     console.log("use recipe byyyy ingrident");
  //     console.log("matchinggggggggggrecipe", matchingRecipes);
  //     const toApi = prodList.map((prodname) => prodname.prod);
  //     const recipes = await recipesService.getRecipeByIngridient(toApi);
  //     console.log(recipes, "rcipes api!!!!");
  //     const fixObj = recipes.map((rec) => {
  //       const exist = myFavs.find((fav) => fav.id === rec.id);
  //       if (exist) {
  //         console.log("exist!!!!!!", exist);
  //         return {
  //           isInfo: false,
  //           isFavorite: true,
  //           fullRecipe: exist.fullRecipe,
  //           ...rec,
  //         };
  //       }

  //       return {
  //         isInfo: false,
  //         isFavorite: false,
  //         fullRecipe: null,
  //         ...rec,
  //       };
  //     });
  //     console.log("matchinggggggggggrecipe", matchingRecipes);
  //     setMetchingRecipe(fixObj);
  //   };

  //   if (!prodList || !myFavs.length) return;
  //   getRecipeByIngridient();
  // }, [prodList]);

  // useEffect(() => {
  //   const getRecipeByIngridient = async () => {
  //     const getAPI = await recipesService.getRecipeByIngridient(toApi);
  //     console.log(getAPI);

  //     const fixObj = getAPI.map((obj) => {
  //       return {
  //         isInfo: false,
  //         fullRecipe: favs.find((fav) =>
  //           fav.id === obj.id ? fav.fullRecipe : null
  //         ),
  //         isFavorite: favs.find((fav) => fav.id === obj.id) ? true : false,
  //         ...obj,
  //       };
  //     });

  //     setMetchingRecipe(fixObj);
  //   };

  //   if (!prodList) return;
  //   getRecipeByIngridient();
  // }, [prodList, favs]);

  const onFavorite = (id) => {
    setMetchingRecipe((recipes) =>
      recipes.map((recipe) => {
        if (recipe.id === id) {
          return { ...recipe, isFavorite: true };
        }
        return recipe;
      })
    );
  };

  async function onViewFullRecipe(id) {
    await cheakRecipeList(matchingRecipes, id, setMetchingRecipe, true, null);
  }

  const onCloseWindow = (id) => {
    setMetchingRecipe((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return { ...rec, isInfo: false };
        }
        return rec;
      })
    );
  };

  if (!matchingRecipes.length) {
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
            <CardItem
              key={recipe.id}
              recipe={recipe}
              onViewFullRecipe={onViewFullRecipe}
              onCloseWindow={onCloseWindow}
              favorites={myFavs}
              onFavorite={onFavorite}
            />
          ))}
      </div>
    </>
  );
};

export default RecipesList;

// const onFavorite = async (id) => {
//   console.log("add favorite", id);
// const match = matchingRecipes.find((recipe) => recipe.id === id);
// const repite = myFav.find((recipe) => recipe.id === id);

// if (!repite && match) {
//   setMyFav((oldFav) => [...oldFav, match]);
// const {
//   likes,
//   missedIngredientCount,
//   missedIngredients,
//   fullRecipe,
//   isInfo,
// } = match;
// try {
//   await favServics.saveFavorite({
//     likes,
//     missedIngredientCount,
//     missedIngredients,
//     fullRecipe,
//     isInfo,
//   });
//   toast("your favorite saved successfuly!", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });
// } catch ({ response }) {
//   if (response && response.status === 400) {
//     console.log(response.data);
//   }
// }
// }
// };
