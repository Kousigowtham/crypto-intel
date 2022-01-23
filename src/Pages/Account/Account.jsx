import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import cryptocurrency from "../../Assets/Login/cryptocurrency.svg";
import FocusedWorking from "../../Assets/Login/Focused Working_Isometric.svg";
const signInInitialValue = {
  email: "",
  username: "",
  password: "",
};

const signUpInitialValue = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchemaSignIn = Yup.object({
  email: Yup.string().email("Invalid email").required("* Required"),
  username: Yup.string().required("* Required"),
  password: Yup.string().required("* Required"),
});

const validationSchemaSignUp = Yup.object({
  email: Yup.string().email("Invalid email").required("* Required"),
  username: Yup.string().required("* Required"),
  password: Yup.string().required("* Required"),
  confirmPassword: Yup.string().required("* Required"),
});

const onSubmitSignIn = (values, formikBag, navigate) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && !currentUser.loggedIn) {
    if (
      currentUser.name === values.username &&
      currentUser.email === values.email
    ) {
      localStorage.removeItem("currentUser");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: values.username,
          email: values.email,
          loggedIn: true,
        })
      );
      navigate("/platforms");
    } else {
      alert("Account doesn't Exists, Register to proceed!");
      return;
    }
  }
};

const onSubmitSignUp = (values, formikBag, navigate) => {
  console.log(formikBag);
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    alert("Account Exists, Login to proceed!");
    navigate("/login");
    return;
  }
  if (values.password === values.confirmPassword) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: values.username,
        email: values.email,
        loggedIn: true,
      })
    );
    navigate("/platforms");
  } else {
    formikBag.setFieldError(
      "confirmPassword",
      "confirm password does not match with password"
    );
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: signInInitialValue,
    validationSchema: validationSchemaSignIn,
    onSubmit: (values, formikBag) =>
      onSubmitSignIn(values, formikBag, navigate),
  });

  return (
    <>
      <div className="account-bg">
        <div className="login-main-container">
          <div className="login-container">
            <div className="greeter-container">
              <div>Welcome back!</div>
              <p>We're excited to see you again!</p>
            </div>
            <form className="form-container" onSubmit={formik.handleSubmit}>
              <Input
                id="email"
                name="email"
                type="email"
                label="EMAIL"
                formik={formik}
              />
              <Input
                id="username"
                name="username"
                type="text"
                label="USERNAME"
                formik={formik}
              />
              <Input
                id="password"
                name="password"
                type="password"
                label="PASSWORD"
                formik={formik}
              />
              <Button
                type="submit"
                Content="Sign In"
                classes="btn-signin"
                // onClick={() => navigate("/")}
              />
            </form>
            <p className="account-helper">
              Need an account?
              <span onClick={() => navigate("/register")}>Register</span>
            </p>
          </div>
          <div className="Img-container">
            <img className="" src={FocusedWorking} alt="" />
          </div>
          <i className="bi bi-paperclip paperClip"></i>
        </div>
      </div>
    </>
  );
};

export const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: signUpInitialValue,
    validationSchema: validationSchemaSignUp,
    onSubmit: (values, formikBag) =>
      onSubmitSignUp(values, formikBag, navigate),
  });

  return (
    <div className="account-bg register">
      <div className="register-main-container">
        <div className="login-container">
          <div className="greeter-container">
            <div>Create an account</div>
            <p>Explore the signals!</p>
          </div>
          <form className="form-container" onSubmit={formik.handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="EMAIL"
              formik={formik}
            />
            <Input
              id="username"
              name="username"
              type="text"
              label="USERNAME"
              formik={formik}
            />
            <Input
              id="password"
              name="password"
              type="password"
              label="PASSWORD"
              formik={formik}
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="CONFIRM PASSWORD"
              formik={formik}
            />
            <Button
              type="submit"
              Content="Sign Up"
              classes="btn-signin"
              // onClick={() => navigate("/")}
            />
          </form>
          <p className="account-helper">
            <span onClick={() => navigate("/login")}>
              Already have an account?
            </span>
          </p>
          <p className="account-helper">
            By registering, you agree to Crypto-Intel's{" "}
            <span>Terms of services</span>
            {" and "}
            <span> Private Policy.</span>
          </p>
        </div>
      </div>
      <div className="register-img-container">
        <img className="" src={cryptocurrency} alt="" />
      </div>
    </div>
  );
};
