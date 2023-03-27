const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className="page-header">
        <div>
          <img
            src={require("../../images/cook_icon.png")}
            style={{ width: "4.8rem" }}
            className="cook-icon"
            alt=""
          />
          <h1>{title}</h1>
        </div>
      </div>
      {description && (
        <div className="div-description">
          <div>
            <p>{description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
