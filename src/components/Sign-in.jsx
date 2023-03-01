import { useFormik } from "formik";
import formikvalidatUsingJoi from "../utils/formikValidationUsingJoi";
import Input from "./common/Input";
import Joi from "joi";
import PageHeader from "./common/PageHeader";
import { useState } from "react";
import { conectUser, createUser, getJWT } from "../services/userService";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        await conectUser(values);
        navigate("/");
        // getJWT();
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
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
    </>
  );
};

export default SignIn;
