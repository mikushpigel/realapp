import { useEffect, useState } from "react";
import foodList from "../services/foodList";
import PageHeader from "./common/PageHeader";
import CardRecipe from "./common/CardRecipe";
import recipeService from "../services/recipeApiServices";

const SearchByIngredient = () => {
  const [search, setInput] = useState("");
  const [productsList, setProductsList] = useState(foodList);
  const [choosenProducts, setChoosenProduct] = useState([]);
  const [resultsRecipes, setResultsRecipes] = useState(null);

  const [error, setError] = useState("");

  //   const matchsProduct = productsList.filter((prod) => prod.includes(search));
  //   const onViewFullRecipe = async (id) => {
  //     const fullRecipe = await getRecipeInfoById(id);
  //     console.log(fullRecipe);
  //   };

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

  //   const handleClick = async () => {
  //     if (choosenProducts.length) {
  //       const ingridients = choosenProducts.join(",+");
  //       const result = await getRecipeByIngridient(ingridients);
  //       setResultsRecipes(result);
  //     } else {
  //       setError("you don't choose any product");
  //     }
  //   };

  return (
    <>
      <PageHeader
        title="Search Recipes by Ingredient"
        description="write some ingredients for your next recipe"
      />
      {/* <div className="search-wrapper">
        <label htmlFor="search">Search Product</label>
        <input
          type="text"
          id="serch"
          placeholder="search"
          value={search}
          onChange={handleChange}
        />
      </div> */}

      <input
        type="text"
        list="products"
        placeholder="search"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
        <CardRecipe
          recipe={choosenProducts}
          //   onViewFullRecipe={onViewFullRecipe}
        />
      )}
    </>
  );
};

export default SearchByIngredient;
