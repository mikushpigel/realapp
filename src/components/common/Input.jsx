const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group my-2 input-common-form">
      <label htmlFor={name} className="label-input">
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        className={["form-control", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
      />
      <span className="invalid-feedback">{error}</span>
    </div>
  );
};

export default Input;
