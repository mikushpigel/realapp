import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import UseMyFav from "../hooks/useMyFav";
import PageHeader from "./common/PageHeader";
import CardItem from "./recipes-form/CardItem";
import PopUpFullRecipe from "./recipes-form/popUpFullRecipe";

const MyFavorites = () => {
  const favorites = UseMyFav();

  const onViewFullRecipe = (id) => {
    favorites.map((fav) => {
      if (fav.id === id) {
        return { ...fav, isInfo: true };
      }
      return fav;
    });
    console.log(favorites);
  };

  return (
    <>
      <PageHeader
        title="My Favorites"
        description="Your favorite are in the list below"
      />
      <div className="row">
        {!favorites.length ? (
          <p>your favorite is empty</p>
        ) : (
          favorites.map((recipe) => (
            <CardItem
              key={recipe._id}
              recipe={recipe}
              favorites={favorites}
              onViewFullRecipe={onViewFullRecipe}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MyFavorites;
