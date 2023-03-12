import { useEffect, useState } from "react";
import foodList from "../../services/foodList";
import PageHeader from "../common/PageHeader";
import recipeService from "../../services/recipeApiServices";
import RecipesList from "./RecipesList";
import { v4 as uuid } from "uuid";

const SearchForm = ({ onSubmit, choosenProducts }) => {
  const [product, setProduct] = useState("");
  const [productsList, setProductsList] = useState(foodList);
  // const [choosenProducts, setChoosenProduct] = useState([]);
  const [error, setError] = useState("");

  // useEffect(() => {

  // }, [choosenProducts]);

  const handleChange = (e) => {
    const { value } = e.target;
    setProduct(value);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      const match = productsList.find((prod) => prod === product);
      const repite = choosenProducts.find(({ prod }) => prod === product);
      if (!match) {
        setError("please choose from list");
        return;
      }
      if (repite) {
        setError("Already Exist In Yout List");
        return;
      }
      onSubmit(product);
      setProduct("");
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
          value={product}
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
        {/* <div className="choosen-product-wrapper">
          {choosenProducts.map((prod, index) => (
            <li key={index}>{prod}</li>
          ))}
        </div> */}
        {/* {choosenProducts.length && (
          <RecipesList
            recipe={choosenProducts}
          onViewFullRecipe={onViewFullRecipe}
          />
        )} */}
      </div>
    </>
  );
};

export default SearchForm;
