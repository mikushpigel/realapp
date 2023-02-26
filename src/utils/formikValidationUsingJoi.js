import Joi from "joi";

const formikvalidatUsingJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });

    const errors = {};

    if (error) {
      for (const {
        message,
        path: [errorKey],
      } of error.details) {
        errors[errorKey] = message;
      }
    }

    return errors;
  };
};

export default formikvalidatUsingJoi;
