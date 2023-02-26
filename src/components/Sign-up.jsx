import { useState } from "react";
import Input from "./common/Input";
import PageHeader from "./common/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikvalidatUsingJoi from "../utils/formikValidationUsingJoi";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: formikvalidatUsingJoi({
      name: Joi.string().min(2).max(42).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(8).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
        navigate("/sign-in");
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
        title={"Sign Up with Yammy Recipes"}
        description={"open a new account, it is free!"}
      />

      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...formik.getFieldProps("name")}
          label="Your Name"
          type="name"
          required
          error={formik.touched.name && formik.errors.name}
        />
        <Input
          {...formik.getFieldProps("email")}
          label="Email"
          type="email"
          required
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          {...formik.getFieldProps("password")}
          label="Password"
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
