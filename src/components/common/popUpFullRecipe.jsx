import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const PopUpFullRecipe = ({ recipe, onCloseWindow }) => {
  const {
    id,
    title,
    readyInMinutes,
    servings,
    image,
    nutrition: { nutrients },
    steps,
    spoonacularSourceUrl: link,
    analyzedInstructions: [instructions],
  } = recipe;

  const [isFavorite, setFavorit] = useState(false);
  const [favRecipe, setFavRecipe] = useState(null);

  const onFavorite = () => {
    setFavorit(!isFavorite);
  };

  useEffect(() => {
    if (isFavorite) {
      setFavRecipe(recipe);
    }
    if (!isFavorite) {
      setFavRecipe(null);
    }
  }, [isFavorite]);

  // const [popUp,setPopUp] = useState({id,isOpen:false,isClose:true})

  return (
    <div className="divInfo">
      <h1>{title}</h1>
      <div>
        <button
          className="star"
          onClick={onFavorite}
          title="add to favorite"
          style={{ color: isFavorite ? "rgb(228, 135, 225)" : "black" }}
        >
          <i className="bi bi-star-fill"></i>
        </button>
      </div>
      <div className="div-description">
        <p>
          for {servings} servings - ready in {readyInMinutes} minutes
        </p>
      </div>
      <div className="div-img">
        <img src={image} className="img-popup" alt={title} />
      </div>

      <div className="instruction-step">
        {instructions &&
          instructions.steps.map(({ number, step }, index) => (
            <li key={index}>
              {number}. {step}
            </li>
          ))}
        <Link to={link} target="_blank">
          for more details
        </Link>
      </div>

      <div className="nutrients-wrapper">
        <h3>Nutritional Information</h3>
        {nutrients.map(({ name, amount, unit }, index) => (
          <>
            <div key={index} className="nutrients-div">
              <p>
                <span style={{ fontWeight: "bolder" }}>{name}: </span>
                {amount}
                {unit}
                {/* {name === "Calories" ||
                name === "Fat" ||
                name === "Carbohydrates" ||
                name === "Protein"
                  ? `${name}: ${amount}${unit}`
                  : null} */}
              </p>
            </div>
          </>
        ))}
      </div>

      <button onClick={() => onCloseWindow(id)} className="close-full-recipe">
        <i className="bi bi-x-circle"></i>
      </button>
    </div>
  );
};

export default PopUpFullRecipe;
