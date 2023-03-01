import { useEffect, useState } from "react";
import foodList from "../services/foodList";
import PageHeader from "./common/PageHeader";
import recipeService from "../services/recipeApiServices";
import RecipesList from "./common/RecipesList";

const SearchByIngredient = () => {
  const [search, setInput] = useState("");
  const [productsList, setProductsList] = useState(foodList);
  const [choosenProducts, setChoosenProduct] = useState([]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      const match = productsList.find((prod) => prod == search);
      if (match) {
        setChoosenProduct((oldList) => [...oldList, search]);
        choosenProducts.join(",+");
        setInput("");
      } else {
        setError("please choose from list");
      }
    }
  };
  return (
    <>
      <PageHeader
        title="What's In My Fridge?"
        description="Find recipes using what you have at your home"
      />
      <div className="wrapper-search-reacipe">
        <h1>RECIPE WITH...</h1>
        <input
          type="text"
          list="products"
          placeholder="search"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="input-search-recipe"
        />
        {error && <span className="text-danger">{error}</span>}
        <datalist id="products">
          {productsList.map((prod) => (
            <option key={prod} value={prod}>
              {prod}
            </option>
          ))}
        </datalist>
        <div className="choosen-product-wrapper">
          {choosenProducts.map((prod, index) => (
            <li key={index}>{prod}</li>
          ))}
        </div>
        {choosenProducts.length && (
          <RecipesList
            recipe={choosenProducts}
            //   onViewFullRecipe={onViewFullRecipe}
          />
        )}
      </div>
    </>
  );
};

export default SearchByIngredient;
