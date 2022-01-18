import React from "react";
import "./Input.css";

const Input = ({ label, classes, formik, ...OtherProps }) => {
  return (
    <div className={`input-container ${classes}`}>
      <label>{label}</label>
      <input
        className={`${
          formik.touched[OtherProps.name] &&
          !formik.errors[OtherProps.name] &&
          "valid-input"
        }  ${
          formik.touched[OtherProps.name] &&
          formik.errors[OtherProps.name] &&
          "error-input"
        }`}
        {...OtherProps}
        {...formik.getFieldProps(OtherProps.name)}
      />
      <ErrorField
        error={formik.errors[OtherProps.name]}
        touched={formik.touched[OtherProps.name]}
      />
    </div>
  );
};

const ErrorField = ({ error, touched }) => {
  return <>{touched && error && <div className="error-field">{error}</div>}</>;
};

export default Input;
