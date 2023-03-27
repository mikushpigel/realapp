import { useState } from "react";
import Input from "./Input";
import PageHeader from "./PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikvalidatUsingJoi from "../../utils/formikValidationUsingJoi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";

const SignUpForm = ({ isBiz, redirect, type = "", description }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = useAuth();

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
        await createUser({ ...values, biz: isBiz });
        toast("your account is ready", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(redirect);
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
        title={`Sign Up ${type} with Yummy Recipes`}
        description={description}
      />

      <form
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
        className="common-form"
      >
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
            className="btn btn-primary btn-form-common"
          >
            Sign Up {type}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
