import { useState } from "react";
import SearchForm from "./SearchForm";
import { v4 as uuid } from "uuid";
import ProdItem from "./ProdItem";
import RecipesList from "./RecipesList";

const Products = () => {
  const [products, setProducts] = useState([]);

  const insertProductsToList = (prod) => {
    setProducts((oldProds) => [
      ...oldProds,
      {
        id: uuid(),
        prod,
      },
    ]);
  };

  const onRemove = (id) => {
    setProducts((prods) => prods.filter((prod) => prod.id !== id));
  };

  // const removeAll = () => {
  //   setProducts((prods) => prods.splice(0, prods.length));
  // };

  return (
    <>
      <SearchForm onSubmit={insertProductsToList} choosenProducts={products} />
      <div
        className="prod-list-wrapper"
        // style={{
        //   backgroundColor: products.length > 0 ? "rgb(232, 187, 238)" : "white",
        // }}
      >
        {products.map(({ id, prod }) => (
          <ProdItem key={id} prod={prod} id={id} onRemove={onRemove} />
        ))}
      </div>

      {products.length > 0 && <RecipesList prodList={products} />}
    </>
  );
};

export default Products;
