import { useEffect, useState } from "react";
import UseMyFav from "../hooks/useMyFav";
import { useRandomRecipes } from "../hooks/useRandomRecipes";
import { cheakRecipeList } from "../utils/checkRecipeList";
import BlessUser from "./common/blessUser";
import PageHeader from "./common/PageHeader";
import CardItem from "./recipes-form/CardItem";
import TopButton from "./common/TopButton";

const RandomRecipes = () => {
  const [randomRecipesList, setRandomRecipes] = useState([]);
  const randomRecipes = useRandomRecipes();
  const myFavs = UseMyFav();

  useEffect(() => {
    const chekfavlist = () => {
      const arr = randomRecipes.map((rec) => {
        const exist = myFavs.find((fav) => fav.id === rec.id);
        console.log(exist, "exist random recipe");
        if (exist) {
          return {
            ...rec,
            isInfo: false,
            isFavorite: true,
            fullRecipe: exist.fullRecipe,
          };
        }
        return {
          ...rec,
          isInfo: false,
          isFavorite: false,
          fullRecipe: null,
        };
      });
      setRandomRecipes(arr);
    };
    if (!randomRecipes.length) return;
    chekfavlist();
  }, [randomRecipes, myFavs]);

  const onFavorite = async (id, fullInfo) => {
    setRandomRecipes((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return {
            ...rec,
            isFavorite: true,
            fullRecipe: fullInfo,
          };
        }
        return rec;
      })
    );
  };

  async function onViewFullRecipe(id) {
    await cheakRecipeList(randomRecipesList, id, setRandomRecipes, true, null);
  }

  const onCloseWindow = (id) => {
    setRandomRecipes((recipes) =>
      recipes.map((rec) => {
        if (rec.id === id) {
          return { ...rec, isInfo: false };
        }
        return rec;
      })
    );
  };

  if (!randomRecipes) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="space-div" id="homeid"></div>
      <PageHeader title="Show me the Yummy " />
      <div className="random-rotate__cards-container">
        {randomRecipesList.map((recipe) => (
          <CardItem
            key={recipe.id}
            recipe={recipe}
            favorites={myFavs}
            onFavorite={onFavorite}
            onCloseWindow={onCloseWindow}
            onViewFullRecipe={onViewFullRecipe}
          />
        ))}
        <TopButton />
      </div>
    </>
  );
};

export default RandomRecipes;
