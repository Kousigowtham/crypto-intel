import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import TextError from "./TextError/TextError";
const FormikTextInput = ({ name, label, ...otherProps }) => {
  return (
    <div>
      <Label labelFor={name}>{label}</Label>
      <Field name={name} id={name} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default FormikTextInput;
