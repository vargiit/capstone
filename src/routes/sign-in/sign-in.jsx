import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../uitls/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form";
import Button from "../../components/button/button";

const SignIn = () => {
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocref = await createUserDocumentFromAuth(response.user);
      }
    },
    []
  );

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();

    const userDocref = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>

      <Button buttonType="google" onClick={logGoogleUser}>
        Sign in with google
      </Button>
      <Button buttonType="google" onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
