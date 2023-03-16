import { useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";

const SortShopingList = ({
  todos,
  onInputChange,
  handleClearTaskComplete,
  onRemove,
  onEdit,
  onUpdate,
  onCancleEdit,
  onInfo,
  onCloseInfoWindow,
  handleRemoveALL,
}) => {
  const [select, setSelect] = useState("");
  const [cases, setCases] = useState({
    isComplete: false,
    isAll: true,
  });

  const { isComplete, isAll } = cases;

  const todosAmount = todos.length;
  const todosComplete = todos.filter((todo) => todo.isComplete);

  const sortBycomplete = (a, b) => (a.isComplete > b.isComplete ? 1 : -1);

  const displayTodosBySelect = (todos, sortType) => {
    return todos
      .sort(sortType)
      .map((item) => (
        <ListItem
          key={item._id}
          itemDetails={item}
          onInputChange={onInputChange}
          onRemove={onRemove}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onCancleEdit={onCancleEdit}
          onInfo={onInfo}
          onCloseInfoWindow={onCloseInfoWindow}
        />
      ));
  };

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    setSelect(value);
    setCases({
      isAll: false,
      isComplete: false,
    });

    switch (value) {
      case "all":
        setCases((oldval) => ({ ...oldval, isAll: true }));
        break;
      case "iscomplete":
        setCases((oldval) => ({ ...oldval, isComplete: true }));
        break;
    }
  };

  return (
    <>
      <div className="todos-amount">
        <div className="deleteAllDiv">
          <Link to={"/my-shopingList/deleteAll"} className="btnDelete">
            Delete All
          </Link>
        </div>
        <select
          onChange={handleChangeSelect}
          className="sort-todo"
          value={select}
        >
          <option value="all">All task</option>
          <option value="iscomplete">Completed tasks</option>
        </select>
        <h2>
          {todosComplete.length} / {todosAmount}
        </h2>
        <button onClick={handleClearTaskComplete} className="btn">
          clear All Done
        </button>
      </div>
      <ul className="todos-container">
        {isAll && displayTodosBySelect(todos, sortBycomplete)}
        {isComplete && displayTodosBySelect(todosComplete, sortBycomplete)}
      </ul>
    </>
  );
};

export default SortShopingList;
