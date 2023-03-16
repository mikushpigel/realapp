import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import buyListServics from "../../services/buyListServices";

const PopUpFullRecipe = ({ recipe, onCloseWindow, onBuyList }) => {
  const {
    id,
    title,
    image,
    fullRecipe: {
      readyInMinutes,
      analyzedInstructions: [instructions],
      servings,
      nutrition: { nutrients },
      spoonacularSourceUrl: link,
    },
    missedIngredients,
    usedIngredients,
  } = recipe;

  const { user } = useAuth();
  const [isClicked, setClick] = useState(false);
  const [buylist, setBuyList] = useState([]);

  useEffect(() => {
    const missedIng = missedIngredients.map(({ name, id, amount, unit }) => {
      return { name, id, amount, unit };
    });
    setBuyList(missedIng);
    const usedIng = usedIngredients.map(({ name, id, amount, unit }) => {
      return { name, id, amount, unit };
    });
    usedIng.map(({ name, id, amount, unit }) =>
      setBuyList((oldval) => [...oldval, { name, id, amount, unit }])
    );
  }, []);

  useEffect(() => {
    async function saveTobuyList() {
      if (isClicked) {
        for (let i = 0; i < buylist.length; i++) {
          try {
            await buyListServics.saveAlist({
              prod: buylist[i].name,
              id: buylist[i].id,
              isComplete: false,
              isEdit: false,
              amount: Number.isInteger(buylist[i].amount)
                ? buylist[i].amount
                : buylist[i].amount.toFixed(1),
              unit: buylist[i].unit,
            });
          } catch ({ response }) {
            if (response && response.status === 400) {
              console.log(response.data);
              return;
            }
          }
        }
        toast("Your Shopping List Saved Successfuly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    saveTobuyList();
  }, [isClicked]);

  const handleClickBuyList = () => {
    if (!user?.biz) {
      alert("for premium account only! please sign up premium");
      return;
    }
    setClick(true);
  };

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
      <div className="wrapper-ingredient">
        <div>
          <h1>Ingredients</h1>
        </div>
        <div className="ingrediend-div">
          {missedIngredients.map(({ name, amount, unit, id, image }) => (
            <div
              key={id}
              className="card box-ingredient"
              style={{ width: "8rem" }}
            >
              {Number.isInteger(amount) ? amount : amount.toFixed(1)} {unit}{" "}
              <img src={image} className="img-ingredient" alt={name} />
              <p>{name}</p>
            </div>
          ))}
          {usedIngredients.map(({ name, amount, unit, id, image }) => (
            <div key={id} className="card box-ingredient">
              {Number.isInteger(amount) ? amount : amount.toFixed(1)} {unit}{" "}
              <img src={image} className="img-ingredient" alt={name} />
              <p>{name}</p>
            </div>
          ))}
        </div>
        <div>
          <button className="btn-shoping-list" onClick={handleClickBuyList}>
            <i className="bi bi-card-list"></i>Add To Shopping List
          </button>
        </div>
      </div>

      <div className="instruction-step">
        <h1>Method</h1>
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
