import { useState } from "react";
import PageHeader from "../common/PageHeader";
import FormByNutrients from "./FormByNutrients";
import RecipesListByNutrient from "./RecipesListByNutrients";

const Nutrients = () => {
  const [nutrients, setNotrients] = useState([]);

  const handleSubmit = (nutrientsTypes) => {
    setNotrients(nutrientsTypes);
  };

  return (
    <>
      <PageHeader
        title="Search By Nutrients"
        description="here you can search recipes by amount of protein you want or how much gram fat"
      />
      <FormByNutrients onSubmit={handleSubmit} />
      {nutrients.length > 0 && (
        <RecipesListByNutrient nutrientsTypes={nutrients} />
      )}
    </>
  );
};

export default Nutrients;
