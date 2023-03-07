import { useState } from "react";
import Input from "./common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import formikvalidatUsingJoi from "../utils/formikValidationUsingJoi";
import PageHeader from "./common/PageHeader";
import { useAuth } from "../context/auth.context";

const PasswordRecovery = () => {
  const [error, setError] = useState("");
  const { recoveryPassword } = useAuth();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
    },
    validate: formikvalidatUsingJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    }),
    async onSubmit(values) {
      try {
        await recoveryPassword(values);
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
        title={"Trouble logging in?"}
        description={
          "Enter your email and we'll send you a link to get back into your account."
        }
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
        <div className="my-2">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn btn-primary"
          >
            Send!
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordRecovery;
