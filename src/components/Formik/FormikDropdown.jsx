import { ErrorMessage, Field } from "formik";
import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import Label from "./Label/Label";
import TextError from "./TextError/TextError";

const FormikDropdown = ({
  label,
  classes,
  name,
  options,
  LabelClassName,
  disabled,
  ...otherProps
}) => {
  return (
    <div className={classes}>
      <Label classes={LabelClassName} labelFor={name}>
        {label}
      </Label>

      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;

          return (
            <Dropdown
              label={label}
              inputName={name}
              options={options}
              setFieldValue={setFieldValue}
              disabled={disabled}
              field={field}
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
