import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseMyFav from "../hooks/useMyFav";
import ScrollToTop from "../services/scrollToTop";
import PageHeader from "./common/PageHeader";
import CardItem from "./recipes-form/CardItem";
import ImageRecipeCard from "./recipes-form/ImageRecipeCard";
import StyleFav from "./StyleFav";

const MyFavorites = () => {
  const favorites = UseMyFav();
  const [favoriteList, setFavorite] = useState(null);

  useEffect(() => {
    setFavorite(favorites);
  }, [favorites]);

  const onViewFullRecipe = (id) => {
    setFavorite((favorites) =>
      favorites.map((fav) => {
        if (fav.id === id) {
          return { ...fav, isInfo: true };
        }
        return fav;
      })
    );
  };
  const onCloseWindow = (id) => {
    setFavorite((favorites) =>
      favorites.map((fav) => {
        if (fav.id === id) {
          return { ...fav, isInfo: false };
        }
        return fav;
      })
    );
  };

  // if(isInfo){
  //   return <PopUpFullRecipe recipe={fullRecipe} onCloseWindow={onCloseWindow}/>
  // }

  return (
    <>
      <StyleFav />
      {/* <PageHeader
        title="My Favorites"
        description="Your favorite are in the list below"
      /> */}

      <div className="wrapper-cards-favorites">
        {!favorites.length ? (
          <h1 className="empty-h1">your favorites list is empty</h1>
        ) : (
          favoriteList.map((recipe) => (
            <ImageRecipeCard
              key={recipe._id}
              recipe={recipe}
              favorites={favorites}
              onViewFullRecipe={onViewFullRecipe}
              favoriteList={favoriteList}
              onCloseWindow={onCloseWindow}
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
        <div className="delete-all-fav">
          {favorites.length > 0 && (
            <Link to={`/my-favorites/deleteAll`} className="card-link">
              Delete All Favorites
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavorites;
