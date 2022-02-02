import { ErrorMessage, Field } from "formik";
import React from "react";
import Datetime from "react-datetime";
// import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import TextError from "./TextError/TextError";
import "./FormikFields.css";
import Label from "./Label/Label";

const FormikDatePicker = ({
  name,
  disabled,
  classes,
  label,
  ...otherProps
}) => {
  return (
    <div className={classes}>
      <Label labelFor={name}> {label}</Label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <Datetime
              id={name}
              {...field}
              selected={value}
              dateFormat="DD-MM-yyyy"
              closeOnSelect
              disabled={disabled}
              onChange={(date) => setFieldValue(name, date)}
              className="date-picker"
              inputProps={{ placeholder: label, disabled: disabled }}
              {...otherProps}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default FormikDatePicker;
