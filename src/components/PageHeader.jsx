const PageHeader = ({ title, description }) => {
  return (
    <>
      <div className="page-header">
        <div>
          <img
            src={require("../images/cook_icon.png")}
            style={{ width: "48px" }}
            className="cook-icon"
            alt=""
          />
          <h1>{title}</h1>
        </div>
      </div>
      {description && (
        <div className="page-header">
          <div>
            <p>{description}</p>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default PageHeader;
