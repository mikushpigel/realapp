import { useState } from "react";

const ItemEdit = ({ details, handleUpdate, handleCancle }) => {
  const { _id, prod, amount, unit } = details;

  const [inputEdit, setInputEdit] = useState({
    prod,
    amount,
    unit,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setError("");
    setInputEdit({ ...inputEdit, [name]: value });
  };

  const checkValidateAndUpdate = () => {
    if (inputEdit.prod.length < 2) {
      setError("task must be at least 2 characters");
      return;
    }
    handleUpdate(_id, inputEdit);
  };
  const updateByEnter = (e) => {
    if (inputEdit.prod.length < 2) {
      setError("task must be at least 2 characters");
      return;
    }
    if (e.key === "Enter") {
      handleUpdate(_id, inputEdit);
    }
  };

  const handleAddBtn = () => {
    setInputEdit((oldVal) => ({ ...oldVal, amount: inputEdit.amount + 1 }));
  };

  const handleSubBtn = () => {
    setInputEdit((oldVal) => ({ ...oldVal, amount: inputEdit.amount - 1 }));
  };

  return (
    <div className="divEdit">
      <div style={{ fontSize: 18, margin: 6 }}>Edit Your Item</div>
      <div>
        <button className="btn" onClick={handleAddBtn}>
          <i className="bi bi-plus-square"></i>
        </button>
        <button className="btn" onClick={handleSubBtn}>
          <i className="bi bi-dash-square"></i>
        </button>
        <input
          name="amount"
          type="number"
          value={inputEdit.amount}
          onChange={handleChange}
          onKeyDown={updateByEnter}
        />
        <input
          name="unit"
          value={inputEdit.unit}
          onChange={handleChange}
          onKeyDown={updateByEnter}
        />
        <input
          name="prod"
          value={inputEdit.prod}
          onChange={handleChange}
          onKeyDown={updateByEnter}
        />
        <button className="btn" onClick={checkValidateAndUpdate}>
          update
        </button>
        <button className="btn" onClick={() => handleCancle(_id)}>
          cancle
        </button>
      </div>
      <div>
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </div>
  );
};

export default ItemEdit;
