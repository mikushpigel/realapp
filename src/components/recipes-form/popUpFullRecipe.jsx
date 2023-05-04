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
      extendedIngredients,
      readyInMinutes,
      analyzedInstructions: [instructions],
      servings,
      nutrition: { nutrients },
      spoonacularSourceUrl: link,
    },
  } = recipe;

  const { user } = useAuth();
  const [isClicked, setClick] = useState(false);
  const [isInBuyList, setClickToBuyList] = useState(false);
  const [buylist, setBuyList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const ingredients = extendedIngredients.map(
      ({ name, id, amount, unit }) => {
        return { name, id, amount, unit };
      }
    );
    setBuyList(ingredients);

    if (!extendedIngredients) return;
  }, []);

  useEffect(() => {
    async function saveTobuyList() {
      if (isClicked) {
        for (let i = 0; i < buylist.length; i++) {
          try {
            await buyListServics.saveItem({
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
              toast.error("something went wrong");
              return;
            }
          }
        }
        setSuccess("Your Shopping List Saved Successfuly!");
      }
    }
    saveTobuyList();
  }, [isClicked]);

  const handleClickBuyList = () => {
    if (!user?.biz) {
      setError("Premium Account Only!");
      return;
    }
    setClick(true);
    setClickToBuyList(true);
  };

  return (
    <div key={id} className="popup">
      <div className="popup__content">
        <div className="title-img-div">
          <h1>{title}</h1>
          <div className="div-description">
            <p>
              for {servings} servings - ready in {readyInMinutes} minutes
            </p>
          </div>
          <div className="div-img">
            <img src={image} className="img-popup" alt={title} />
          </div>
        </div>
        <div className="wrapper-ingredient">
          <h1>Ingredients</h1>

          <div className="ingrediend-div">
            {extendedIngredients.map(
              ({ name, amount, unit, id, image, original }) => (
                <div
                  key={original}
                  className="card box-ingredient"
                  style={{ width: "8rem" }}
                >
                  {Number.isInteger(amount) ? amount : amount.toFixed(1)} {unit}{" "}
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
                    className="img-ingredient"
                    alt={name}
                  />
                  <p>{name}</p>
                </div>
              )
            )}
          </div>
          <div>
            {error || success ? (
              <>
                {error && (
                  <span className="error-span text-danger">{error}</span>
                )}
                {success && <span className="span-success">{success}</span>}
              </>
            ) : (
              <button
                className="btn-shoping-list"
                onClick={handleClickBuyList}
                title={isInBuyList ? "already added" : ""}
                disabled={isInBuyList}
                style={{ backgroundColor: isInBuyList ? "grey" : "" }}
              >
                <i className="bi bi-card-list"></i>&nbsp;&nbsp;&nbsp;Add To
                Shopping List
              </button>
            )}
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
          <div className="link-web">
            <Link className="details-link" to={link} target="_blank">
              for more details
            </Link>
          </div>
        </div>

        <div className="nutrients-wrapper">
          <h1>Nutritional Information</h1>
          {nutrients.map(({ name, amount, unit }, index) => (
            <>
              <div key={index} className="nutrients-div">
                <p>
                  <span style={{ fontWeight: "bolder" }}>{name}: </span>
                  {amount}
                  {unit}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="btn-div">
          <button
            onClick={() => onCloseWindow(id)}
            className="close-full-recipe"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpFullRecipe;
