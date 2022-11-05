import { getRedirectResult } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../uitls/firebase/firebase.utils";
import Button from "../button/button";
import FormInput from "../form-input/form-input";

import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocref = await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    const userDocref = await createUserDocumentFromAuth(user);
  };

  const resetForm = () => {
    setformFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong Password");
          break;
        case "auth/user-not-found":
          alert("User Doesnt exist");
          break;
        default:
          alert(error.message);
      }
    }

    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} onChange={handleChange}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={signInWithGoogleRedirect}
          >
            google redirect
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
