import React from "react";
import FormikDatePicker from "./FormikDatePicker";
import FormikDropdown from "./FormikDropdown";
import FormikTextInput from "./FormikTextInput";

const FormikController = ({ control, ...otherProps }) => {
  switch (control) {
    case "text":
      return <FormikTextInput {...otherProps} />;
    case "dropdown":
      return <FormikDropdown {...otherProps} />;
    case "datepicker":
      return <FormikDatePicker {...otherProps} />;
    default:
      return null;
  }
};

export default FormikController;
