import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Account.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="account-bg">
      <div className="login-container">
        <div className="greeter-container">
          <div>Welcome back!</div>
          <p>We're excited to see you again!</p>
        </div>
        <form className="form-container">
          <Input
            type="email"
            label="EMAIL"
            classes="input-container"
            required
          />
          <Input
            type="text"
            label="USERNAME"
            classes="input-container"
            required
          />
          <Input
            type="password"
            label="PASSWORD"
            classes="input-container"
            required
          />
          <Button
            type="submit"
            Content="Sign In"
            classes="btn-signin"
            onClick={() => navigate("/")}
          />
        </form>
        <p className="account-helper">
          Need an account?
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="account-bg register">
      <div className="login-container">
        <div className="greeter-container">
          <div>Create an account</div>
          <p>Explore the signals!</p>
        </div>
        <form className="form-container">
          <Input
            type="email"
            label="EMAIL"
            classes="input-container"
            required
          />
          <Input
            type="text"
            label="USERNAME"
            classes="input-container"
            required
          />
          <Input
            type="password"
            label="PASSWORD"
            classes="input-container"
            required
          />
          <Input
            type="password"
            label="CONFIRM PASSWORD"
            classes="input-container"
            required
          />
          <Button
            type="submit"
            Content="Sign Up"
            classes="btn-signin"
            onClick={() => navigate("/")}
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
  );
};
