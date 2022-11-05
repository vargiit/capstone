import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../uitls/firebase/firebase.utils";
import Button from "../button/button";
import FormInput from "../form-input/form-input";

import "./sign-up-form.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetForm = () => {
    setformFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return alert("password doesnt match");

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const userDocref = await createUserDocumentFromAuth(user, {
        displayName,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already exists");
      }
    }

    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <FormInput
          type="text"
          required
          name="displayName"
          value={displayName}
          label="Name"
        />
        <FormInput
          type="email"
          required
          name="email"
          value={email}
          label="Email"
        />
        <FormInput
          type="password"
          required
          name="password"
          value={password}
          label="Password"
        />
        <FormInput
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
        />

        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
