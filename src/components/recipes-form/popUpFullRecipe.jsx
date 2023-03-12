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
    spoonacularSourceUrl: link,
    analyzedInstructions: [instructions],
  } = recipe;

  return (
    <div key={id} className="divInfo">
      <h1>{title}</h1>
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
