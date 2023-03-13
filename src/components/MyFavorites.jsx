import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import UseMyFav from "../hooks/useMyFav";
import favServics from "../services/favServices";
import PageHeader from "./common/PageHeader";
import CardItem from "./recipes-form/CardItem";
import PopUpFullRecipe from "./recipes-form/popUpFullRecipe";

const MyFavorites = () => {
  const favorites = UseMyFav();

  const handleClick = async () => {
    await favServics.deleteAll();
  };

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
      <div className="wrapper">
        <div>
          {/* <button
            className="delete-btn"
            title="delete all favorites"
            onClick={handleClick}
          >
            <i className="bi bi-trash-fill"></i>
          </button> */}
          {favorites.length > 0 && (
            <Link to={`/my-favorites/deleteAll`} className="card-link">
              Delete All Favorites
            </Link>
          )}
        </div>
        <div className="row">
          {!favorites.length ? (
            <p>your favorites list is empty</p>
          ) : (
            favorites.map((recipe) => (
              <CardItem
                key={recipe._id}
                recipe={recipe}
                favorites={favorites}
                onViewFullRecipe={onViewFullRecipe}
                deleteLink={
                  <Link
                    to={`/my-favorites/delete/${recipe._id}`}
                    className="card-link"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Link>
                }
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavorites;
