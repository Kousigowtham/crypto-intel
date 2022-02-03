import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
import TextError from "./TextError/TextError";
const FormikTextInput = ({
  name,
  classes,
  LabelClassName,
  label,
  ...otherProps
}) => {
  return (
    <div className={classes}>
      <Label labelFor={name} classes={LabelClassName}>
        {label}
      </Label>
      <Field className="form-control" name={name} id={name} {...otherProps} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default FormikTextInput;
