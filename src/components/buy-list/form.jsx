import { useState } from "react";

const ShopingListForm = ({ onSumbit }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setError("");
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      if (input.length < 2) {
        setError("please insert at least 2 characters");
        return;
      }
      onSumbit(input);
      setInput("");
    }
  };
  return (
    <div className="input-group">
      <div className="task-box">
        <span className="input-group-text" id="basic-addon3">
          I Need To
        </span>
        <input
          onChange={handleInputChange}
          onKeyDown={handleSubmit}
          value={input}
          type="text"
          className="form-control shadow-none"
          aria-describedby="basic-addon3"
        />
        <button
          className="btn-shoping-list"
          onClick={handleSubmit}
          type="button"
        >
          Add
        </button>
      </div>
      <div className="div-form">
        <span style={{ color: "purple", textDecoration: "underline" }}>
          {error}
        </span>
      </div>
    </div>
  );
};

export default ShopingListForm;
