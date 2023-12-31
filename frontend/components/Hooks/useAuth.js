import { useState, useEffect } from "react";

import useME from "./useME";
import Constants from "../Constants";
import { AUTH } from "../../config/firebaseConfig";
import { translateFirebaseError } from "../Shared/Utils";
import { getSiso, setSiso } from "../SisoManager";
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(
    Constants.USER_IS_NOT_AUTHENTICATED
  );
  const { fetchToken } = useME();

  useEffect(() => {
    const unsubscribe = AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Wrapper function for firebase sign up with email and password.
   * @param {String} email
   * @param {String} password
   * @param {CallableFunction} callBackFn callback function to be called after the user is created or if there is an error.
   * callBackFn(userCredential, error)
   */
  const registerWithEmailAndPassword = (email, password, callBackFn = null) => {
    AUTH.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // Registered and signed in
        if (callBackFn) {
          callBackFn(userCredentials, null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };

  /**
   * Wrapper function for firebase sign in with email and password.
   * @param {String} email
   * @param {String} password
   * @param {CallableFunction} callBackFn callback function to be called after the user is logged in or if there is an error.
   * callBackFn(userCredential, error)
   */
  const signInWithEmailAndPassword = (email, password, callBackFn = null) => {
    AUTH.signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        // Signed in
        const _fbToken = await userCredentials.user?.getIdTokenResult();
        fetchToken(_fbToken.token, (response) => {
          if (!response || response.success === undefined) {
            // Handle invalid response or null response
            console.log("Invalid response from fetchToken:", response);
            return callBackFn(null, "Server error. Please contact support.");
          }
          if (!response.success) {
            if (response.error === Constants.NEEDS_REGISTRATION) {
              setAuthState(Constants.NEEDS_REGISTRATION);
            } else {
              console.log("error fetching token: ", response.error);
            }
            return callBackFn(null, "Server error. Please contact support.");
          } else {
            setSiso(true);
            setAuthState(Constants.USER_IS_AUTHENTICATED);
          }
        });

        if (callBackFn) {
          callBackFn(userCredentials, null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(null, translateFirebaseError(error?.toString()));
        }
      });
  };
  /**
   * Wrapper function for firebase sign out.
   */
  const signOut = () => {
    console.log("signing out...");
    setAuthState(Constants.USER_IS_NOT_AUTHENTICATED);
    setSiso(false);
    AUTH.signOut();
  };

  /**
   * Wrapper function for firebase's send email verification.
   * @param {firebase.User} authUser
   * @param {CallableFunction} callBackFn callback function to be called after the email is sent or if there is an error.
   */
  const sendVerificationEmail = (authUser = null, callBackFn = null) => {
    if (!authUser) {
      authUser = user;
    }

    if (authUser) {
      authUser
        .sendEmailVerification()
        .then(() => {
          if (callBackFn) {
            callBackFn(null);
          }
        })
        .catch((error) => {
          if (callBackFn) {
            callBackFn(translateFirebaseError(error?.toString()));
          }
        });
    }
  };

  const sendPasswordResetEmail = (email, callBackFn = null) => {
    AUTH.sendPasswordResetEmail(email)
      .then(() => {
        if (callBackFn) {
          callBackFn(null);
        }
      })
      .catch((error) => {
        if (callBackFn) {
          callBackFn(translateFirebaseError(error?.toString()));
        }
      });
  }

  return {
    user,
    setUser,
    authState,
    setAuthState,
    signOut,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendVerificationEmail,
    sendPasswordResetEmail,
  };
}
