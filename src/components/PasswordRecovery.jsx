import { useState } from "react";
import Input from "./common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import formikvalidatUsingJoi from "../utils/formikValidationUsingJoi";
import PageHeader from "./common/PageHeader";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const PasswordRecovery = () => {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const { recoveryPassword, user } = useAuth();

  const handleChange = (e) => {
    setInput(e.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });
    //const val = await schema.validateAsync({ email: input });
    try {
      await recoveryPassword({ email: input });
    } catch ({ response }) {
      // setError(details[0].message);
      setError(response.data);
      return;
    }
  };

  // const formik = useFormik({
  //   validateOnMount: true,
  //   initialValues: {
  //     email: "",
  //   },
  //   validate: formikvalidatUsingJoi({
  //     email: Joi.string()
  //       .email({ tlds: { allow: false } })
  //       .required(),
  //   }),
  //   async onSubmit(values) {
  //     try {
  //       await recoveryPassword(values);
  //       // getJWT();
  //     } catch ({ response }) {
  //       setError(response.data);
  //     }
  //   },
  // });

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader
        title={"Trouble logging in?"}
        description={
          "Enter your email and we'll send you a link to get back into your account."
        }
      />
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit}
        className="common-form"
      >
        {error && <div className="alert alert-danger">{error}</div>}
        {/* <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={input}
          onChange={handleChange}
        /> */}
        <Input
          label="Email"
          name="email"
          onChange={handleChange}
          value={input}
        />
        <div className="my-2">
          <button
            type="submit"
            // disabled={!formik.isValid}
            className="btn btn-primary btn-form-common"
          >
            Send!
          </button>
        </div>
      </form>
    </>
  );
};

export default PasswordRecovery;
