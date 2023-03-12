const ProdItem = ({ id, prod, onRemove }) => {
  return (
    <li className="prod-item-li">
      <span className="prod-item-name">{prod}</span>
      <button onClick={() => onRemove(id)} className="btn">
        <i className="bi bi-trash3-fill"></i>
      </button>
    </li>
  );
};

export default ProdItem;
