import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemEdit from "./ItemEdit";
// import TodoEdit from "./TodoEdit";
// import TodoInfo from "./TodoInfo";

const ListItem = ({
  itemDetails,
  onInputChange,
  onEdit,
  onUpdate,
  onCancleEdit,
}) => {
  const { _id, prod, isComplete, isEdit, amount, unit } = itemDetails;
  const [complete, setComplete] = useState(isComplete);

  useEffect(() => {
    async function setIsComplete() {}
  });

  const handleChange = () => {
    onInputChange(_id, isComplete);
    setComplete(!isComplete);
    return <Link to={`my-buylist/complete/${_id}`}>gg</Link>;
  };

  if (isEdit) {
    return (
      <ItemEdit
        details={itemDetails}
        handleUpdate={onUpdate}
        handleCancle={onCancleEdit}
      />
    );
  }
  // } else if (isInfo) {
  //   return (
  //     <TodoInfo
  //       id={id}
  //       todo={todo}
  //       closeInfoWindow={onCloseInfoWindow}
  //       options={options}
  //     />
  //   );
  // }
  return (
    <li
      className="todo-item-li"
      style={{ textDecoration: isComplete && "line-through" }}
    >
      <input
        onChange={handleChange}
        className="input-checkbox"
        type="checkbox"
        checked={isComplete}
      />
      <span>
        {amount} {unit} {prod}
      </span>

      <Link to={`/my-shopingList/delete/${_id}`} className="btn">
        <i className="bi bi-trash3-fill trashbtn"></i>
      </Link>
      <li onClick={() => onEdit(_id)} className="btn">
        <i className="bi bi-pen editbtn"></i>
      </li>
    </li>
  );
};

export default ListItem;
