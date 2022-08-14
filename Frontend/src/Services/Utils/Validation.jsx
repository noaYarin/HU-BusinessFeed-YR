import Joi from "joi";

export const formikValidation = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });
    return handleErrors(error);
  };
};

export const JoiValidation = (schema, values) => {
  const { error } = Joi.object(schema).validate(values, {
    abortEarly: false,
  });

  return handleErrors(error);
};

const handleErrors = (error) => {
  if (!error) return null;
  const errors = {};
  for (const detail of error.details) {
    errors[detail.path[0]] = detail.message;
  }
  return errors;
};

export default formikValidation;
