import { ErrorMessage, Field } from "formik";
import React from "react";
import Dropdown from "../Drop_down/Dropdown";
import Label from "./Label/Label";
import TextError from "./TextError/TextError";

const FormikDropdown = ({
  label,
  classes,
  name,
  options,
  disabled,
  ...otherProps
}) => {
  return (
    <div className={classes}>
      <Label labelFor={name}> {label}</Label>

      <Field name={name}>
        {({ form }) => {
          const { setFieldValue } = form;

          return (
            <Dropdown
              label={label}
              inputName={name}
              options={options}
              setFieldValue={setFieldValue}
              disabled={disabled}
              {...otherProps}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default FormikDropdown;
