const ProdItem = ({ id, prod, onRemove }) => {
  return (
    <li className="prod-item-li">
      <button onClick={() => onRemove(id)} className="btn">
        <i className="bi bi-trash3-fill"></i>
      </button>
      <span className="prod-item-name">{prod}</span>
    </li>
  );
};

export default ProdItem;
