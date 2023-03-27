import { useState } from "react";
import { toast } from "react-toastify";

const FormByNutrients = ({ onSubmit }) => {
  const [input, setInput] = useState({
    minCarbs: "",
    maxCarbs: "",
    minProtein: "",
    maxProtein: "",
    minCalories: "",
    maxCalories: "",
    minFat: "",
    maxFat: "",
  });

  const {
    minCarbs,
    maxCarbs,
    minProtein,
    maxProtein,
    minCalories,
    maxCalories,
    minFat,
    maxFat,
  } = input;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInput((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      const valuesInput = Object.values(input);
      const isFilter = valuesInput.find(Boolean);
      if (!isFilter) {
        toast.error("At least one nutrient filter must be given!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      const nutrientTypes = [];
      for (let filter in input) {
        if (input[filter]) {
          nutrientTypes.push({ [filter]: input[filter] });
        }
      }
      onSubmit(nutrientTypes);
      setInput({
        minCalories: "",
        maxCalories: "",
        minFat: "",
        maxFat: "",
        minProtein: "",
        maxProtein: "",
        minCarbs: "",
        maxCarbs: "",
      });
    }
  };

  return (
    <div className="wrapper-search-reacipe">
      <div className="nutrients-types">
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={minCalories}
          type="number"
          name="minCalories"
          className="input-form"
          placeholder="minCalories"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={maxCalories}
          type="number"
          name="maxCalories"
          className="input-form"
          placeholder="maxCalories"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={minProtein}
          type="number"
          name="minProtein"
          className="input-form"
          placeholder="minProtein"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={maxProtein}
          type="number"
          name="maxProtein"
          className="input-form"
          placeholder="maxProtein"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={minCarbs}
          type="number"
          name="minCarbs"
          className="input-form"
          placeholder="minCarbs"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={maxCarbs}
          type="number"
          name="maxCarbs"
          className="input-form"
          placeholder="maxCarbs"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={minFat}
          type="number"
          name="minFat"
          className="input-form"
          placeholder="minFat"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={maxFat}
          type="number"
          name="maxFat"
          className="input-form"
          placeholder="maxFat"
        />
      </div>
      <div>
        <button onClick={handleSubmit} className="btn btn-search">
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default FormByNutrients;
