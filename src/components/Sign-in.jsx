import { useFormik } from "formik";
import formikvalidatUsingJoi from "../utils/formikValidationUsingJoi";
import Input from "./common/Input";
import Joi from "joi";
import PageHeader from "./common/PageHeader";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikvalidatUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(8).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        navigate("/");
        // getJWT();
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader
        title={"Sign In With Yammy Recipes"}
        description={"A few steps and you will be connected"}
      />
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...formik.getFieldProps("email")}
          label="email"
          type="email"
          required
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          {...formik.getFieldProps("password")}
          label="password"
          type="password"
          required
          error={formik.touched.password && formik.errors.password}
        />
        <div className="my-2">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="d-flex flex-column">
        <p>Don't have an account?</p>
        <NavLink to="/sign-up"> SIGN UP </NavLink>
        <NavLink to="/sign-up-premium"> SIGN UP PREMIUM </NavLink>
      </div>
      <div>
        <h2>forget your password?</h2>
        <NavLink to="/password-recovery">click here</NavLink>
      </div>
    </>
  );
};

export default SignIn;
