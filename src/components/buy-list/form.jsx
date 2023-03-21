import { useState } from "react";

const ShopingListForm = ({ onSumbit }) => {
  const [inputForm, setInputForm] = useState({
    prod: "",
    amount: "",
    unit: "",
  });
  const [error, setError] = useState("");
  const { prod, amount, unit } = inputForm;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setError("");
    setInputForm((oldInput) => ({ ...oldInput, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      if (prod.length < 2) {
        setError("product name must be at least 2 characters");
        return;
      }
      onSumbit(inputForm);
      setInputForm({ prod: "", amount: "", unit: "" });
    }
  };
  return (
    <div className="input-group">
      <div className="task-box">
        <span className="input-group-text" id="basic-addon3">
          I Need To Buy
        </span>
      </div>
      <div className="task-box">
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={amount}
          type="number"
          name="amount"
          className="input-form"
          placeholder="100"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={unit}
          type="text"
          name="unit"
          className="input-form"
          placeholder="gram"
        />
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={prod}
          type="text"
          name="prod"
          className="input-form"
          placeholder="banana"
        />
      </div>
      <div className="div-form">
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </div>
  );
};

export default ShopingListForm;
